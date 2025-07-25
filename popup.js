// chrome.runtime.sendMessage({ ask: "getMessage" }, (response) => {
//   // Update popup's HTML with data from background
//   document.getElementById("timer").textContent = response.reply;
// });
const countdownDisplay = document.getElementById("timer")
const startButton =document.getElementById("startButton")

startButton.addEventListener("click", () => {
  chrome.runtime.sendMessage({ command: "start" });
});

setInterval(() => {
  chrome.runtime.sendMessage({ command: "getTime" }, (response) => {
    if (response && response.time) {
      countdownDisplay.textContent = response.time;
    }
  });
}, 1000);