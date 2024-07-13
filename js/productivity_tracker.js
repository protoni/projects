function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cname) === 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

let workSeconds = 0;
let entertainmentSeconds = 0;
let allowedEntertainmentSeconds = 0;
let workInterval, entertainmentInterval;
let ratio = 4;
let useCookies = false;

function startWork() {
    if (!workInterval) {
        stopEntertainment(); // Ensure only one timer runs at a time
        workInterval = setInterval(() => {
            workSeconds++;
            updateTimer('work-time', workSeconds);
            updateAllowedTime();
            autoSave();
        }, 1000);
    }
}

function stopWork() {
    clearInterval(workInterval);
    workInterval = null;
    autoSave();
}

function startEntertainment() {
    if (!entertainmentInterval) {
        stopWork(); // Ensure only one timer runs at a time
        entertainmentInterval = setInterval(() => {
            entertainmentSeconds++;
            allowedEntertainmentSeconds--;
            updateTimer('entertainment-time', entertainmentSeconds);
            updateAllowedTime();
            autoSave();
        }, 1000);
    }
}

function stopEntertainment() {
    clearInterval(entertainmentInterval);
    entertainmentInterval = null;
    autoSave();
}

function updateTimer(id, seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    document.getElementById(id).textContent = `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}

function updateAllowedTime() {
    allowedEntertainmentSeconds = Math.floor(workSeconds / ratio) - entertainmentSeconds;
    const allowedTimeElement = document.getElementById('allowed-time');
    const sign = allowedEntertainmentSeconds < 0 ? "-" : "+";
    allowedTimeElement.textContent = `${sign}${pad(Math.floor(Math.abs(allowedEntertainmentSeconds) / 3600))}:${pad(Math.floor((Math.abs(allowedEntertainmentSeconds) % 3600) / 60))}:${pad(Math.abs(allowedEntertainmentSeconds) % 60)}`;
    if (allowedEntertainmentSeconds < 0) {
        allowedTimeElement.classList.add('negative');
        allowedTimeElement.classList.remove('positive');
    } else {
        allowedTimeElement.classList.add('positive');
        allowedTimeElement.classList.remove('negative');
    }
}

function pad(num) {
    return num.toString().padStart(2, '0');
}

function modifyTime(type, operation) {
    const minutes = parseInt(prompt(`Enter minutes to ${operation}:`));
    if (!isNaN(minutes) && minutes > 0) {
        if (type === 'work') {
            if (operation === 'add') {
                workSeconds += minutes * 60;
            } else if (operation === 'subtract') {
                workSeconds = Math.max(0, workSeconds - minutes * 60);
            }
            updateTimer('work-time', workSeconds);
            updateAllowedTime();
        } else if (type === 'entertainment') {
            if (operation === 'add') {
                entertainmentSeconds += minutes * 60;
            } else if (operation === 'subtract') {
                entertainmentSeconds = Math.max(0, entertainmentSeconds - minutes * 60);
            }
            updateTimer('entertainment-time', entertainmentSeconds);
            updateAllowedTime();
        }
        autoSave();
    }
}

function toggleSubmenu(id) {
    const submenu = document.getElementById(id);
    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
}

function resetCounters() {
    if (confirm('Are you sure you want to reset all counters and storage?')) {
        workSeconds = 0;
        entertainmentSeconds = 0;
        allowedEntertainmentSeconds = 0;
        clearInterval(workInterval);
        clearInterval(entertainmentInterval);
        workInterval = null;
        entertainmentInterval = null;
        updateTimer('work-time', workSeconds);
        updateTimer('entertainment-time', entertainmentSeconds);
        updateAllowedTime();
        if (useCookies) {
            deleteCookie('workSeconds');
            deleteCookie('entertainmentSeconds');
            deleteCookie('ratio');
        } else {
            localStorage.removeItem('workSeconds');
            localStorage.removeItem('entertainmentSeconds');
            localStorage.removeItem('ratio');
        }
    }
}

function updateRatio() {
    ratio = parseInt(document.getElementById('ratio-input').value);
    if (useCookies) {
        setCookie('ratio', ratio, 365);
    } else {
        localStorage.setItem('ratio', ratio);
    }
    updateAllowedTime();
    autoSave();
}

function switchStorage() {
    if (useCookies) {
        if (confirm('Are you sure you want to switch to using local storage?')) {
            useCookies = false;
            document.getElementById('storage-switch-button').textContent = 'Switch to Cookies';
            saveToLocalStorage();
        }
    } else {
        if (confirm('Are you sure you want to switch to using cookies for storage?')) {
            if (!getCookie('cookieConsent')) {
                document.getElementById('cookie-banner').style.display = 'block';
            } else {
                useCookies = true;
                document.getElementById('storage-switch-button').textContent = 'Switch to Local Storage';
                saveToCookies();
            }
        }
    }
}

function acceptCookies() {
    setCookie('cookieConsent', 'true', 365);
    document.getElementById('cookie-banner').style.display = 'none';
    useCookies = true;
    document.getElementById('storage-switch-button').textContent = 'Switch to Local Storage';
    saveToCookies();
}

function cancelCookies() {
    document.getElementById('cookie-banner').style.display = 'none';
}

function saveToCookies() {
    setCookie('workSeconds', workSeconds, 365);
    setCookie('entertainmentSeconds', entertainmentSeconds, 365);
    setCookie('ratio', ratio, 365);
}

function saveToLocalStorage() {
    localStorage.setItem('workSeconds', workSeconds);
    localStorage.setItem('entertainmentSeconds', entertainmentSeconds);
    localStorage.setItem('ratio', ratio);
}

function autoSave() {
    if (useCookies) {
        saveToCookies();
    } else {
        saveToLocalStorage();
    }
}

function loadFromLocalStorage() {
    if (localStorage.getItem('workSeconds')) {
        workSeconds = parseInt(localStorage.getItem('workSeconds'));
        updateTimer('work-time', workSeconds);
    }
    if (localStorage.getItem('entertainmentSeconds')) {
        entertainmentSeconds = parseInt(localStorage.getItem('entertainmentSeconds'));
        updateTimer('entertainment-time', entertainmentSeconds);
    }
    if (localStorage.getItem('ratio')) {
        ratio = parseInt(localStorage.getItem('ratio'));
        document.getElementById('ratio-input').value = ratio;
    }
}

function loadFromCookies() {
    if (getCookie('workSeconds')) {
        workSeconds = parseInt(getCookie('workSeconds'));
        updateTimer('work-time', workSeconds);
    }
    if (getCookie('entertainmentSeconds')) {
        entertainmentSeconds = parseInt(getCookie('entertainmentSeconds'));
        updateTimer('entertainment-time', entertainmentSeconds);
    }
    if (getCookie('ratio')) {
        ratio = parseInt(getCookie('ratio'));
        document.getElementById('ratio-input').value = ratio;
    }
}

window.onload = function() {
    if (getCookie('cookieConsent')) {
        useCookies = true;
        document.getElementById('storage-switch-button').textContent = 'Switch to Local Storage';
        loadFromCookies();
    } else {
        loadFromLocalStorage();
    }
    updateAllowedTime(); // Ensure the allowance is updated on load
}

window.onunload = function() {
    autoSave();
}
