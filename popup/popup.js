document.addEventListener("DOMContentLoaded", () => {
    const myButton = document.getElementById("apply");
    myButton.addEventListener("click", () => {
        const whitelist = document.getElementById("whitelist");
        const blacklist = document.getElementById("blacklist");
        console.log("Button clicked in extension page!");
    });
});
