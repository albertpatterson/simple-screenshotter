/**
 * @file
 * @author Albert Patterson <albert.patterson.code@gmail.com>
 * @see [Linkedin]{@link https://www.linkedin.com/in/apattersoncmu/}
 * @see [Github]{@link https://github.com/albertpatterson}
 * @see [npm]{@link https://www.npmjs.com/~apatterson189}
 * @see [Youtube]{@link https://www.youtube.com/channel/UCrECEffgWKBMCvn5tar9bYw}
 * @see [Medium]{@link https://medium.com/@albert.patterson.code}
 *
 * Free software under the GPLv3 licence. Permissions of this strong copyleft
 * license are conditioned on making available complete source code of
 * licensed works and modifications, which include larger works using a
 * licensed work, under the same license. Copyright and license notices must
 * be preserved. Contributors provide an express grant of patent rights.
 */

import { handleRequestInServiceWorker } from '../messaging/message';
import {
  create as createSelectScreenshotAreaRequest,
  messageSystem as selectScreenshotAreaMessageSystem,
} from '../messaging/message_systems/select_screenshot_area_request/message_system';

import {
  create as createCropDownloadScreenshotRequest,
  messageSystem as cropDownloadScreenshotMessageSystem,
} from '../messaging/message_systems/crop_download_screenshot_request/message_system';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  return handleRequestInServiceWorker(request, sender, sendResponse);
});

chrome.action.onClicked.addListener(async (tab) => {
  try {
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
