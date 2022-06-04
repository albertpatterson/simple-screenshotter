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

import { BaseRequest, Rectangle } from '../../types';
import { createMessageSystem } from '../base_message_system';
import { handleAsyncInTab } from './handle_async_in_tab';
import { handleAsyncInServiceWorker } from '../noops/handle_async_in_service_worker';

const REQUEST_NAME = 'select screenshot area';
export interface SelectScreenshotAreaRequest extends BaseRequest {
  name: typeof REQUEST_NAME;
}

export function create(): SelectScreenshotAreaRequest {
  return {
    name: REQUEST_NAME,
  };
}

export function canHandle(
  request: BaseRequest
): request is SelectScreenshotAreaRequest {
  return request.name === REQUEST_NAME;
}

export interface SelectScreenshotAreaData {
  rectangle: Rectangle;
}

export const messageSystem = createMessageSystem<
  SelectScreenshotAreaRequest,
  SelectScreenshotAreaData
>(canHandle, handleAsyncInTab, handleAsyncInServiceWorker);
