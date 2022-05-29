import { handleRequestInServiceWorker } from '../messaging/message';
import { logResponse } from '../messaging/util';
import {
  create as createSelectScreenshotAreaRequest,
  messageSystem as selectScreenshotAreaMessageSystem,
} from '../messaging/message_systems/select_screenshot_area_request/message_system';

import {
  create as createCropDownloadScreenshotRequest,
  messageSystem as cropDownloadScreenshotMessageSystem,
} from '../messaging/message_systems/crop_download_screenshot_request/message_system';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('received message in service worker', request);

  return handleRequestInServiceWorker(request, sender, sendResponse);
});

chrome.action.onClicked.addListener(async (tab) => {
  try {
    console.log('action clicked, requesting screenshot area');

    const selectScreenshotAreaRequest = createSelectScreenshotAreaRequest();
    const selectScreenshotAreaResponse =
      await selectScreenshotAreaMessageSystem.sendInServiceWorker(
        tab.id,
        selectScreenshotAreaRequest
      );

    if (!selectScreenshotAreaResponse) {
      throw new Error('void response to select screenshot area');
    }
    const cropRectangle = selectScreenshotAreaResponse.data.rectangle;

    const dataUrl = await chrome.tabs.captureVisibleTab();

    const fileName = 'simple-screenshot-download-' + Date.now();

    const cropDownloadScreenshotRequest = createCropDownloadScreenshotRequest(
      dataUrl,
      cropRectangle,
      fileName
    );
    const cropDownloadScreenshotResponse =
      await cropDownloadScreenshotMessageSystem.sendInServiceWorker(
        tab.id,
        cropDownloadScreenshotRequest
      );

    if (!cropDownloadScreenshotResponse) {
      throw new Error('void response to select screenshot area');
    }
  } catch (error) {
    throw error;
  }
});
