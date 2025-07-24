// chrome.runtime.sendMessage({ ask: "getMessage" }, (response) => {
//   // Update popup's HTML with data from background
//   document.getElementById("timer").textContent = response.reply;
// });
const startingMinutes = 5;
let time = startingMinutes * 60
const countdown = document.getElementById('timer')
let countdownInterval;
setInterval(updateCountdown,1000)
function updateCountdown(){
    const minutes =Math.floor(time/60)
    let seconds =time% 60
    seconds = seconds < 10 ? '0' + seconds : seconds;
    countdown.innerHTML=`${minutes}:${seconds}`
    time--
      if (time < 0) {
        clearInterval(thisIntervalId); // You'd need to store the setInterval ID
        countdown.innerHTML = "00:00"; // Or "Time's Up!"
    }
}