import { handleRequestInTab } from '../messaging/message';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('received request in tab', request);

  return handleRequestInTab(request, sender, sendResponse);
});
