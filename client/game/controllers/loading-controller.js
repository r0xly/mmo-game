const loadingScreen = document.getElementById("loading-screen");
const loadingText = document.getElementById("loading-screen-text");

export function enableLoadingScreen(text) {
    loadingScreen.style.zIndex = 100;
    loadingScreen.style.transition = "none";
    loadingScreen.style.visibility = "visible";
    loadingScreen.style.opacity = 1; 
    loadingText.innerHTML = text;
}

export function disableLoadingScreen() {
    loadingScreen.style.transition = "all 1s ease-in";
    loadingScreen.style.visibility = "none";
    loadingScreen.style.zIndex = 0;
    loadingScreen.style.opacity = 0; 
}