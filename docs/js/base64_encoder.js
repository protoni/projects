document.addEventListener("DOMContentLoaded", function () {
    const inputTextElement = document.getElementById('inputText');
    const outputTextElement = document.getElementById('outputText');
    const fileInputElement = document.getElementById('fileInput');
    const fileDropElement = document.getElementById('fileDrop');

    if (inputTextElement) {
        inputTextElement.addEventListener('input', () => {
            updateByteCount('inputText', 'inputByteCount');
            updateStatistics('text', 0);
        });
    }

    if (outputTextElement) {
        outputTextElement.addEventListener('input', () => {
            updateByteCount('outputText', 'outputByteCount');
            updateStatistics('text', 0);
        });
    }

    if (fileInputElement) {
        fileInputElement.addEventListener('change', handleFileSelect);
    }

    if (fileDropElement) {
        fileDropElement.addEventListener('drop', handleFileDrop);
        fileDropElement.addEventListener('dragover', allowFileDrop);
    }
});

function encodeBase64() {
    const inputText = document.getElementById('inputText').value;
    const startTime = performance.now();
    const encodedText = btoa(unescape(encodeURIComponent(inputText)));
    const endTime = performance.now();
    document.getElementById('outputText').value = encodedText;
    updateByteCount('outputText', 'outputByteCount');
    updateStatistics('text', endTime - startTime);
}

function decodeBase64() {
    const inputText = document.getElementById('inputText').value;
    const startTime = performance.now();
    try {
        const decodedText = decodeURIComponent(escape(atob(inputText)));
        document.getElementById('outputText').value = decodedText;
    } catch (e) {
        document.getElementById('outputText').value = 'Invalid Base64 string';
    }
    const endTime = performance.now();
    updateByteCount('outputText', 'outputByteCount');
    updateStatistics('text', endTime - startTime);
}

function updateByteCount(textareaId, byteCountId) {
    const text = document.getElementById(textareaId).value;
    const byteCount = new TextEncoder().encode(text).length;
    document.getElementById(byteCountId).textContent = `Bytes: ${byteCount}`;
}

function updateStatistics(dataType, encodingTime) {
    const inputText = document.getElementById('inputText').value;
    const outputText = document.getElementById('outputText').value;
    const inputBytes = new TextEncoder().encode(inputText).length;
    const outputBytes = new TextEncoder().encode(outputText).length;

    let statsText = 'Statistics: ';
    statsText += `Original Size: <span>${inputBytes}</span> bytes, `;
    statsText += `Encoded/Decoded Size: <span>${outputBytes}</span> bytes, `;
    statsText += `Data Type: <span>${dataType}</span>, `;
    statsText += `Encoding Time: <span>${encodingTime.toFixed(2)}</span> ms`;

    if (outputText.includes('=')) {
        const paddingCount = (outputText.match(/=/g) || []).length;
        statsText += `, Base64 Padding: <span>${paddingCount}</span> characters`;
    }

    document.getElementById('statistics').innerHTML = statsText;
}

function handleFileSelect(event) {
    const files = event.target.files;
    processFiles(files);
}

function allowFileDrop(event) {
    event.preventDefault();
    event.stopPropagation();
}

function handleFileDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    processFiles(files);
}

function processFiles(files) {
    const fileResults = document.getElementById('fileResults');
    fileResults.innerHTML = ''; // Clear previous results

    const loader = document.getElementById('loader');
    loader.style.display = 'block';

    const totalFiles = files.length;
    let processedFiles = 0;

    Array.from(files).forEach(file => {
        const reader = new FileReader();

        reader.onloadstart = function() {
            // Show loader
            loader.style.display = 'block';
        };

        reader.onload = function(e) {
            const content = e.target.result;
            const startTime = performance.now();
            const encodedContent = btoa(content);
            const endTime = performance.now();

            const fileContainer = document.createElement('div');
            fileContainer.className = 'file-result';

            const fileName = document.createElement('p');
            fileName.textContent = `File: ${file.name}`;

            const fileStats = document.createElement('p');
            const originalSize = content.length;
            const encodedSize = encodedContent.length;
            const encodingTime = (endTime - startTime).toFixed(2);
            fileStats.innerHTML = `Original Size: <span>${originalSize}</span> bytes, Encoded Size: <span>${encodedSize}</span> bytes, Encoding Time: <span>${encodingTime}</span> ms`;

            const encodedTextArea = document.createElement('textarea');
            encodedTextArea.value = encodedContent;
            encodedTextArea.rows = 5;
            encodedTextArea.cols = 50;
            encodedTextArea.readOnly = true;

            fileContainer.appendChild(fileName);
            fileContainer.appendChild(fileStats);
            fileContainer.appendChild(encodedTextArea);

            fileResults.appendChild(fileContainer);

            processedFiles++;
            if (processedFiles === totalFiles) {
                loader.style.display = 'none'; // Hide loader when all files are processed
            }
        };

        reader.readAsBinaryString(file);
    });
}
