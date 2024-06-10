document.addEventListener("DOMContentLoaded", function () {
    const hashInputElement = document.getElementById('hashInput');

    if (hashInputElement) {
        hashInputElement.addEventListener('input', generateHash);
    }

    const fileInputElement = document.getElementById('fileInput');
    if (fileInputElement) {
        fileInputElement.addEventListener('change', handleFileSelect);
    }

    const fileDropElement = document.getElementById('fileDrop');
    if (fileDropElement) {
        fileDropElement.addEventListener('drop', handleFileDrop);
        fileDropElement.addEventListener('dragover', allowFileDrop);
    }

    fetchDicewareList();
});

function generateHash() {
    const inputText = document.getElementById('hashInput').value;

    if (!inputText) return;

    const md5Hash = SparkMD5.hash(inputText);
    const sha1Hash = CryptoJS.SHA1(inputText).toString();
    const sha256Hash = CryptoJS.SHA256(inputText).toString();

    document.getElementById('md5Hash').textContent = md5Hash;
    document.getElementById('sha1Hash').textContent = sha1Hash;
    document.getElementById('sha256Hash').textContent = sha256Hash;
}

function generateUUID() {
    const uuid = URL.createObjectURL(new Blob()).substring(9);
    document.getElementById('uuidOutput').textContent = uuid;
}

let dicewareList = [];

async function fetchDicewareList() {
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'block';

    const cachedDicewareList = localStorage.getItem('dicewareList');
    if (cachedDicewareList) {
        dicewareList = JSON.parse(cachedDicewareList);
        if (loader) loader.style.display = 'none';
        return;
    }

    try {
        const response = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt'));
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const text = data.contents;
        dicewareList = text.split('\n').map(line => line.split('\t')[1]).filter(word => word);
        localStorage.setItem('dicewareList', JSON.stringify(dicewareList));
    } catch (error) {
        console.error('Error fetching Diceware list:', error);
    } finally {
        if (loader) loader.style.display = 'none';
    }
}

function generateDicewarePassphrase() {
    const numberOfWords = parseInt(document.getElementById('dicewareLength').value, 10);
    if (dicewareList.length === 0) {
        document.getElementById('dicewareOutput').textContent = 'Error: Diceware list not loaded.';
        return;
    }

    let passphrase = '';
    for (let i = 0; i < numberOfWords; i++) {
        const randomIndex = Math.floor(Math.random() * dicewareList.length);
        passphrase += dicewareList[randomIndex] + (i < numberOfWords - 1 ? '-' : '');
    }

    document.getElementById('dicewareOutput').textContent = passphrase;
}

function generatePassword() {
    const length = parseInt(document.getElementById('passwordLength').value, 10);
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    document.getElementById('passwordOutput').textContent = password;
}

function handleFileSelect(event) {
    const files = event.target.files;
    processFiles(files);
}

function allowFileDrop(event) {
    event.preventDefault();
}

function handleFileDrop(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    processFiles(files);
}

function processFiles(files) {
    const fileResults = document.getElementById('fileHashResults');
    fileResults.innerHTML = ''; // Clear previous results

    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'block';

    const totalFiles = files.length;
    let processedFiles = 0;

    Array.from(files).forEach(file => {
        const reader = new FileReader();

        reader.onloadstart = function() {
            // Show loader
            if (loader) loader.style.display = 'block';
        };

        reader.onload = function(e) {
            const content = e.target.result;

            const md5Hash = SparkMD5.hashBinary(content);
            const sha1Hash = CryptoJS.SHA1(CryptoJS.enc.Latin1.parse(content)).toString();
            const sha256Hash = CryptoJS.SHA256(CryptoJS.enc.Latin1.parse(content)).toString();

            const fileContainer = document.createElement('div');
            fileContainer.className = 'file-result';

            const fileName = document.createElement('p');
            fileName.textContent = `File: ${file.name}`;

            const fileStats = document.createElement('p');
            const originalSize = content.length;
            fileStats.innerHTML = `Original Size: <span>${originalSize}</span> bytes`;

            const md5Element = document.createElement('p');
            md5Element.textContent = `MD5: ${md5Hash}`;

            const sha1Element = document.createElement('p');
            sha1Element.textContent = `SHA-1: ${sha1Hash}`;

            const sha256Element = document.createElement('p');
            sha256Element.textContent = `SHA-256: ${sha256Hash}`;

            fileContainer.appendChild(fileName);
            fileContainer.appendChild(fileStats);
            fileContainer.appendChild(md5Element);
            fileContainer.appendChild(sha1Element);
            fileContainer.appendChild(sha256Element);

            fileResults.appendChild(fileContainer);

            processedFiles++;
            if (processedFiles === totalFiles) {
                if (loader) loader.style.display = 'none'; // Hide loader when all files are processed
            }
        };

        reader.readAsBinaryString(file);
    });
}
