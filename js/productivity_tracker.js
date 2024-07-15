

let workSeconds = 0;
let entertainmentSeconds = 0;
let allowedEntertainmentSeconds = 0;
let workInterval, entertainmentInterval;
let ratio = 4;

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
    const button = document.querySelector(`button[onclick="toggleSubmenu('${id}')"]`);
    if (submenu.style.display === 'block') {
        submenu.style.display = 'none';
        button.classList.remove('open');
    } else {
        submenu.style.display = 'block';
        button.classList.add('open');
    }
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
        localStorage.removeItem('workSeconds');
        localStorage.removeItem('entertainmentSeconds');
        localStorage.removeItem('ratio');
        
    }
}

function updateRatio() {
    ratio = parseInt(document.getElementById('ratio-input').value);
    localStorage.setItem('ratio', ratio);
    updateAllowedTime();
    autoSave();
}

function saveToLocalStorage() {
    localStorage.setItem('workSeconds', workSeconds);
    localStorage.setItem('entertainmentSeconds', entertainmentSeconds);
    localStorage.setItem('ratio', ratio);
}

function autoSave() {
    console.log("Auto-saving data...");

    saveToLocalStorage();
}

function loadFromLocalStorage() {
    if (localStorage.getItem('workSeconds') && 
        localStorage.getItem('entertainmentSeconds')) {
            
        workSeconds = parseInt(localStorage.getItem('workSeconds'));
        entertainmentSeconds = parseInt(localStorage.getItem('entertainmentSeconds'));
        console.log("Loaded workSeconds from localStorage: " + workSeconds);
        console.log("Loaded entertainmentSeconds from localStorage: " + entertainmentSeconds);
        updateTimer('work-time', workSeconds);
        updateTimer('entertainment-time', entertainmentSeconds);
    }

    if (localStorage.getItem('ratio')) {
        ratio = parseInt(localStorage.getItem('ratio'));
        document.getElementById('ratio-input').value = ratio;
    }
}

window.onload = function() {
    console.log("Loading data...");
    loadFromLocalStorage();
    updateAllowedTime();
}

window.onunload = function() {
    console.log("Saving data on unload...");
    autoSave();
}
