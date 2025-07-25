
let time = 25 * 60;
let countdownInterval = null;

function startTimer() {
  if (countdownInterval) return;

  countdownInterval = setInterval(() => {
    time--;
    if (time < 0) {
      clearInterval(countdownInterval);
      countdownInterval = null;
      time = 0;
      
    }
  }, 1000);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.command === "start") {
    startTimer();
    sendResponse({ status: "started" });
  }

   if (message.command === "getTime") {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedTime = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    sendResponse({ time: formattedTime });
  }

  return true; // Required for async sendResponse
});
