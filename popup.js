document.addEventListener('DOMContentLoaded', function() {
  const websiteInput = document.getElementById('websiteInput');
  const addButton = document.getElementById('addWebsite');
  const websiteList = document.getElementById('websiteList');

  // Load saved websites
  loadWebsites();

  // Add website button click handler
  addButton.addEventListener('click', addWebsite);

  // Enter key handler for input
  websiteInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      addWebsite();
    }
  });

  function addWebsite() {
    const website = websiteInput.value.trim().toLowerCase();
    if (!website) return;

    // Remove http:// or https:// if present
    const cleanWebsite = website.replace(/^https?:\/\//, '');

    chrome.storage.sync.get(['websites'], function(result) {
      const websites = result.websites || [];
      if (!websites.includes(cleanWebsite)) {
        websites.push(cleanWebsite);
        chrome.storage.sync.set({ websites: websites }, function() {
          loadWebsites();
          websiteInput.value = '';
        });
      }
    });
  }

  function loadWebsites() {
    chrome.storage.sync.get(['websites'], function(result) {
      const websites = result.websites || [];
      websiteList.innerHTML = '';
      
      websites.forEach(website => {
        const item = document.createElement('div');
        item.className = 'website-item';
        item.innerHTML = `
          <span>${website}</span>
          <button class="delete-btn" data-website="${website}">Delete</button>
        `;
        websiteList.appendChild(item);
      });

      // Add delete button handlers
      document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
          const websiteToDelete = this.getAttribute('data-website');
          deleteWebsite(websiteToDelete);
        });
      });
    });
  }

  function deleteWebsite(website) {
    chrome.storage.sync.get(['websites'], function(result) {
      const websites = result.websites || [];
      const updatedWebsites = websites.filter(w => w !== website);
      chrome.storage.sync.set({ websites: updatedWebsites }, loadWebsites);
    });
  }
}); 