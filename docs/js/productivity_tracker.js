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
        }, 1000);
    }
}

function stopWork() {
    clearInterval(workInterval);
    workInterval = null;
}

function startEntertainment() {
    if (!entertainmentInterval) {
        stopWork(); // Ensure only one timer runs at a time
        entertainmentInterval = setInterval(() => {
            entertainmentSeconds++;
            allowedEntertainmentSeconds--;
            updateTimer('entertainment-time', entertainmentSeconds);
            updateAllowedTime();
        }, 1000);
    }
}

function stopEntertainment() {
    clearInterval(entertainmentInterval);
    entertainmentInterval = null;
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
    }
}

function toggleSubmenu(id) {
    const submenu = document.getElementById(id);
    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
}

function resetCounters() {
    if (confirm('Are you sure you want to reset all counters and local storage?')) {
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
    }
}

function updateRatio() {
    ratio = parseInt(document.getElementById('ratio-input').value);
    updateAllowedTime();
}

// Save and load times from localStorage
window.onload = function() {
    if (localStorage.getItem('workSeconds')) {
        workSeconds = parseInt(localStorage.getItem('workSeconds'));
        updateTimer('work-time', workSeconds);
    }
    if (localStorage.getItem('entertainmentSeconds')) {
        entertainmentSeconds = parseInt(localStorage.getItem('entertainmentSeconds'));
        updateTimer('entertainment-time', entertainmentSeconds);
    }
    updateAllowedTime(); // Ensure the allowance is updated on load
}

window.onunload = function() {
    localStorage.setItem('workSeconds', workSeconds);
    localStorage.setItem('entertainmentSeconds', entertainmentSeconds);
}
