// Listen for tab updates
chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
  // Only handle main frame navigation
  if (details.frameId !== 0) return;

  const url = new URL(details.url);
  const hostname = url.hostname.toLowerCase();

  // Check if this URL should be redirected
  chrome.storage.sync.get(['websites'], function(result) {
    const websites = result.websites || [];
    
    // Check if the current website matches any in our list
    if (websites.some(website => hostname.includes(website))) {
      // Check if we're already in incognito mode
      chrome.tabs.get(details.tabId, function(tab) {
        if (!tab.incognito) {
          // Create a new incognito window with the URL
          chrome.windows.create({
            url: details.url,
            incognito: true
          }, function(window) {
            // Close the original tab
            chrome.tabs.remove(details.tabId);
          });
        }
      });
    }
  });
}); 