import { handleRequestInTab } from '../messaging/message';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  return handleRequestInTab(request, sender, sendResponse);
});
