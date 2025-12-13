// Should I remember the URL when they toggle in and out of reader mode? Put into persistent storage?
alreadyPutTabInReaderMode = {};

let whitelist = "";
let blacklist = "";

function getWhitelist() {
    return whitelist;
}

function getBlacklist() {
    return blacklist;
}

function setWhitelist(newList) {
    whitelist = newList;
}

function setBlacklist(newList) {
    blacklist = newList;
}

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // onUpdated never gets called with isInReaderMode == true apparently
    if (changeInfo.status === "complete") {
        // The transition into reader mode has no URL for some reason,
        // and isArticle seems to be false once already in reader mode.
        // TODO: Add whitelist/blacklist and other options to control this behavior.
        if (tab.isArticle && tab.url) {
            console.log(`Tab ${tabId} loaded: ${tab.url}`);
            console.log(`Reader view = ${tab.isInReaderMode}`);

            const key = tabId + " - " + tab.url;
            const alreadySwitched = alreadyPutTabInReaderMode[key] || false;
            console.log(`Already switched[${key}] = ${alreadySwitched}`);
            console.log(`whitelist = "${whitelist}"`);
            console.log(`blacklist = "${blacklist}"`);
            if (!tab.isInReaderMode && !alreadySwitched) {
                // TODO: Some pages have a problem where they seem to switch, but then switch back.
                // It might be related to popups, for example cookie settings question popups.
                // Maybe put a time stamp on it... and allow it to switch back if it happens fast enough.
                alreadyPutTabInReaderMode[key] = true;
                browser.tabs.toggleReaderMode(tabId);
            }
        }
    }
});
