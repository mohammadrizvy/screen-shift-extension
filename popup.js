document.getElementById("apply").addEventListener("click", () => {
  const device = document.getElementById("device-select").value;

  let width, height;
  switch (device) {
    case "iPhone 12":
      width = 390;
      height = 844;
      break;
    case "iPhone 11":
      width = 414;
      height = 896;
      break;
    case "iPad Pro":
      width = 1024;
      height = 1366;
      break;
    case "Galaxy S21":
      width = 360;
      height = 800;
      break;
    case "Galaxy Note 20":
      width = 412;
      height = 915;
      break;
    case "Pixel 5":
      width = 393;
      height = 851;
      break;
    case "OnePlus 8":
      width = 412;
      height = 869;
      break;
    case "Laptop":
      width = 1366;
      height = 768;
      break;
    case "Desktop":
      width = 1920;
      height = 1080;
      break;
    default:
      console.error("Unknown device selected");
      return;
  }

  console.log(
    `Opening a new window with size ${width}x${height} for ${device}`
  );

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) {
      console.error("No active tab found");
      return;
    }

    const tab = tabs[0];
    if (
      tab.url.startsWith("chrome://") ||
      tab.url.startsWith("https://chrome.google.com/webstore")
    ) {
      console.error("Cannot access a chrome:// URL or the Chrome Web Store");
      return;
    }

    chrome.windows.create({
      url: tab.url,
      width: width,
      height: height,
      left: Math.round((screen.width - width) / 2),
      top: Math.round((screen.height - height) / 2),
      type: "popup",
    });
  });
});
    