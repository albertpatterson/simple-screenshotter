import { BaseRequest } from '../../types';
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

export interface Rectangle {
  x: number;
  y: number;
  height: number;
  width: number;
}

export interface SelectScreenshotAreaData {
  rectangle: Rectangle;
}

export const messageSystem = createMessageSystem<
  SelectScreenshotAreaRequest,
  SelectScreenshotAreaData
>(canHandle, handleAsyncInTab, handleAsyncInServiceWorker);
