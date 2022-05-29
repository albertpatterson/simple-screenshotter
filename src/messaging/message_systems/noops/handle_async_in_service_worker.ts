import { BaseRequest, ResponseResult } from '../../types';

export async function handleAsyncInServiceWorker<T>(
  request: BaseRequest,
  sender: chrome.runtime.MessageSender
): Promise<ResponseResult<T>> {
  throw new Error('noop handleAsyncInServiceWorker called');
}
