function saveLists(whitelistElement, blacklistElement) {
    const whitelistVal = whitelistElement.value;
    const blacklistVal = blacklistElement.value;

    let gettingWindow = browser.runtime.getBackgroundPage();
    let savingLists = browser.storage.local.set({
        whitelist: whitelistVal,
        blacklist: blacklistVal,
    });

    Promise.all([gettingWindow, savingLists])
        .then(([backgroundWin]) => {
            backgroundWin.setWhitelist(whitelistVal);
            backgroundWin.setBlacklist(blacklistVal);
            console.log("Lists saved.");
        })
        .catch((error) => {
            console.error("Error saving lists.");
        });
}

// TODO: Move storage loading and saving into background thread. It needs to load there first.
function loadLists(whitelistElement, blacklistElement) {
    let gettingWindow = browser.runtime.getBackgroundPage();
    let loadingLists = browser.storage.local.get(["whitelist", "blacklist"]);
    Promise.all([gettingWindow, loadingLists])
        .then(([backgroundWin, lists]) => {
            whitelistElement.value = lists.whitelist || "";
            blacklistElement.value = lists.blacklist || "";
            backgroundWin.setWhitelist(lists.whitelist);
            backgroundWin.setBlacklist(lists.blacklist);
        })
        .catch((error) => {
            console.error("Error loading lists.");
        });
}

document.addEventListener("DOMContentLoaded", () => {
    loadLists(
        document.getElementById("whitelist"),
        document.getElementById("blacklist")
    );

    const myButton = document.getElementById("apply");
    myButton.addEventListener("click", () => {
        console.log("Button clicked in extension page!");
        saveLists(
            document.getElementById("whitelist"),
            document.getElementById("blacklist")
        );
    });
});
