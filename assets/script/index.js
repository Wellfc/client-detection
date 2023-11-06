'use strict';

// Utility functions
function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

function select(selector, parent = document) {
    return parent.querySelector(selector);
}

function selectById(selector, parent = document) {
    return parent.getElementById(selector);
}

function selectAll(selector, parent = document) {
    return [...parent.querySelectorAll(selector)];
}

const clientPlatform = select('#client-platform');
const clientLanguage = select('#client-language');
const clientBrowser = select('#client-browser');
const windowWidth = select('#window-width');
const windowHeight = select('#window-height');
const windowOrientation = select('#window-orientation');
const batteryLevel = select('#battery-level');
const batteryChargingStatus = select('#battery-charging-status');
const networkStatus = select('#network-status');
const networkInfo = select('.network-info');


// Get the system platform
function getSystemPlatform() {
    let clientOs = window.navigator.userAgent;
    let finalOs = "";
    if (clientOs.indexOf('Windows') !== -1) {
        finalOs = "Windows";
    }
    else if (clientOs.indexOf('Mac') !== -1) {
        finalOs = "MacOS";
    }
    else if (clientOs.indexOf('Linux') !== -1 && clientOs.indexOf('X11') !== -1) {
        finalOs = "Linux"
    }
    
    return finalOs;
}

// Get the system language
function getSystemLanguage() {
    let clientLanguage = window.navigator.language;
    return clientLanguage;
}

// Get the browser name
function getBrowserName() {
    let clientBrowser = window.navigator.userAgent;
    let finalBrowser = "";
    if (clientBrowser.indexOf('Edg') !== -1) {
        finalBrowser = "Edge";
    }
    else if (clientBrowser.indexOf('Chrome') !== -1) {
        finalBrowser = "Chrome";
    }
    else if (clientBrowser.indexOf('Firefox') !== -1) {
        finalBrowser = "Firefox";
    }
    
    return finalBrowser;
}

// Get the window width
function getWindowWidth() {
    return window.innerWidth;
}

// Get the window height
function getWindowHeight() {
    return window.innerHeight;
}

// Get the window orientation
function getWindowOrientation() {
    if (window.innerWidth > window.innerHeight) {
        return "Landscape";
    } else {
        return "Portrait";
    }
}

// Set the battery charging status
function setBatteryChargingStatus() {
    if (getBrowserName() !== "Firefox") {
        navigator.getBattery().then((battery) => {
            const updateAllBatteryInfo = () => {
                updateLevelInfo();
                updateChargeInfo();
            };
            const updateLevelInfo = () => {
                batteryLevel.innerText = `Level: ${Math.round(battery.level * 100) }%`;
            };
            const updateChargeInfo = () => {
                batteryChargingStatus.innerText = `Status: ${battery.charging ? 'Charging' : 'Not Charging'}`;
            };

            updateAllBatteryInfo();

            onEvent('levelchange', battery, updateLevelInfo);
            onEvent('chargingchange', battery, updateChargeInfo);
        });
    }
}

// Get the network status
function checkForConnection() {
    if (navigator.onLine) {
        networkInfo.classList.add('green');
        networkInfo.classList.remove('red');
        networkStatus.innerText = 'ONLINE';
        console.log('green');
    } else {
        networkInfo.classList.add('red');
        networkInfo.classList.remove('green');
        networkStatus.innerText = 'OFFLINE';
        console.log('red');
    }
}

onEvent('load', window, () => {
    // Set the system platform
    clientPlatform.innerText = `Platform: ${getSystemPlatform()}`;

    // Set the system language
    clientLanguage.innerText = `Language: ${getSystemLanguage()}`;

    // Set the browser name
    clientBrowser.innerText = `Browser: ${getBrowserName()}`;

    // Set the window width
    windowWidth.innerText = `Width: ${getWindowWidth()}px`;

    // Set the window height
    windowHeight.innerText = `Height: ${getWindowHeight()}px`;

    // Set the window orientation
    windowOrientation.innerText = `Orientation: ${getWindowOrientation()}`;

    // Set the battery charging status
    setBatteryChargingStatus();

    checkForConnection();
});

onEvent('resize', window, () => {
    windowWidth.innerText = `Width: ${getWindowWidth()}px`;
    windowHeight.innerText = `Height: ${getWindowHeight()}px`;
    windowOrientation.innerText = `Orientation: ${getWindowOrientation()}`;
});




const intervalId = setInterval(checkForConnection, 1000);
const chargingCheck = setInterval(setBatteryChargingStatus, 1000);

window.addEventListener('onLine', checkForConnection);
window.addEventListener('offLine', checkForConnection);





