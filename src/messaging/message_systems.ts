import { BaseRequest } from './types';
import { BaseMessageSystem } from './message_systems/base_message_system';
import { messageSystem as simpleMessageSystem } from './message_systems/simple_request/message_system';
import { messageSystem as selectScreenshotAreaMessageSystem } from './message_systems/select_screenshot_area_request/message_system';
import { messageSystem as cropDownloadScreenshotMessageSystem } from './message_systems/crop_download_screenshot_request/message_system';

const messageSystems: Array<BaseMessageSystem<BaseRequest, {}>> = [
  simpleMessageSystem,
  selectScreenshotAreaMessageSystem,
  cropDownloadScreenshotMessageSystem,
  // Add subsequent message systems here
];

export function getMessageSystems() {
  return [...messageSystems];
}
