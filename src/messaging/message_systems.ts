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

import { BaseRequest } from './types';
import { BaseMessageSystem } from './message_systems/base_message_system';
import { messageSystem as selectScreenshotAreaMessageSystem } from './message_systems/select_screenshot_area_request/message_system';
import { messageSystem as cropDownloadScreenshotMessageSystem } from './message_systems/crop_download_screenshot_request/message_system';

const messageSystems: Array<BaseMessageSystem<BaseRequest, {}>> = [
  selectScreenshotAreaMessageSystem,
  cropDownloadScreenshotMessageSystem,
  // Add subsequent message systems here
];

export function getMessageSystems() {
  return [...messageSystems];
}
