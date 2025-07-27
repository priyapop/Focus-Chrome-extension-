function handleCommand(message,sendResponse){
  if (message.command === "start") {
    const startTime = Date.now();
    const duration = 1 * 60; 
    chrome.storage.local.set({ sessionType: "pomodoro", startTime, duration });

    chrome.alarms.create("sessionEnd", { delayInMinutes: 1 });//name when alarm ends
    sendResponse({ status: "started" });
  } else if (message.command === "getTime") {
    chrome.storage.local.get(["startTime", "duration"], ({ startTime, duration }) => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTime) / 1000);
      const remaining = duration - elapsed;

      if (remaining <= 0) {
        sendResponse({ time: "00:00" });
      } else {
        const minutes = Math.floor(remaining / 60);
        const seconds = remaining % 60;
        const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        sendResponse({ time: formattedTime })
      }
    });
    return true;
  }
}



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
 const isAsync = handleCommand(message, sendResponse);
  return isAsync;
});

chrome.alarms.onAlarm.addListener(alarm => {
  console.log("Alarm fired:", alarm.name)
  if (alarm.name === "sessionEnd") {
    chrome.notifications.create({
      type:"basic",
      iconUrl: "done.png",
      title:"completed",
      message:"time to take a break",
      priority:2 //high priority
    }
    )
    chrome.storage.local.get("sessionType", ({ sessionType }) => {
      if (sessionType === "pomodoro") {
        // break session 
      } else {
        // pomodoro 
      }
    });
  }
});
