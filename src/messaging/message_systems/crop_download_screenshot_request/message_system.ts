import { BaseRequest } from '../../types';
import { createMessageSystem } from '../base_message_system';
import { handleAsyncInTab } from './handle_async_in_tab';
import { handleAsyncInServiceWorker } from '../noops/handle_async_in_service_worker';
import { stringifyResponse } from '../../util';
import { readConfigFile } from 'typescript';
import { Rectangle } from '../select_screenshot_area_request/message_system';

const REQUEST_NAME = 'crop download screenshot';
export interface CropDownlodScreenshotRequest extends BaseRequest {
  name: typeof REQUEST_NAME;
  dataUrl: string;
  rectangle: Rectangle;
  fileName: string;
}

export function create(
  dataUrl: string,
  rectangle: Rectangle,
  fileName: string
): CropDownlodScreenshotRequest {
  return {
    name: REQUEST_NAME,
    dataUrl,
    rectangle,
    fileName,
  };
}

export function canHandle(
  request: BaseRequest
): request is CropDownlodScreenshotRequest {
  return request.name === REQUEST_NAME;
}

export interface CropDownlodScreenshotData {}

export const messageSystem = createMessageSystem<
  CropDownlodScreenshotRequest,
  CropDownlodScreenshotData
>(canHandle, handleAsyncInTab, handleAsyncInServiceWorker);