const countdownDisplay = document.getElementById("timer");
const startButton = document.getElementById("startButton");

startButton.addEventListener("click", () => {
  chrome.runtime.sendMessage({ command: "start", delayInMinutes: 25 }, response => {
    console.log(response.status);
    updateTimer()
  });
});
updateTimer()
function updateTimer() {
  chrome.runtime.sendMessage({ command: "getTime" }, response => {
    if (response && response.time) {
      countdownDisplay.textContent = response.time;
    } else {
      countdownDisplay.textContent = "00:00";
    }
  });
}

setInterval(updateTimer, 1000);
