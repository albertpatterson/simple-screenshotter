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

import {
  CropDownlodScreenshotData,
  CropDownlodScreenshotRequest,
} from './message_system';
import { ResponseResult, Rectangle } from '../../types';

export async function handleAsyncInTab(
  request: CropDownlodScreenshotRequest,
  sender: chrome.runtime.MessageSender
): Promise<ResponseResult<CropDownlodScreenshotData>> {
  const croppedDataUrl = await getCroppedImage(
    request.dataUrl,
    request.rectangle
  );

  downloadImage(croppedDataUrl, request.fileName);

  try {
    return {
      succeeded: true,
      data: {},
    };
  } catch {
    return {
      succeeded: false,
      data: {},
    };
  }
}

function getCroppedImage(
  dataUrl: string,
  cropRectangle: Rectangle
): Promise<string> {
  return new Promise((res, rej) => {
    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    const img = document.createElement('img') as HTMLImageElement;
    img.src = dataUrl;
    img.onload = () => {
      canvas.width = cropRectangle.width;
      canvas.height = cropRectangle.height;

      ctx.drawImage(
        img,
        cropRectangle.x,
        cropRectangle.y,
        cropRectangle.width,
        cropRectangle.height,
        0,
        0,
        cropRectangle.width,
        cropRectangle.height
      );

      res(canvas.toDataURL());
      document.body.removeChild(canvas);
      document.body.removeChild(img);
    };

    img.onerror = (err) => rej(err);

    canvas.onerror = (err) => rej(err);

    document.body.appendChild(img);
    document.body.appendChild(canvas);
  });
}

async function downloadFromUrl(url: string, name: string) {
  const a: HTMLAnchorElement = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

async function downloadImage(dataUrl: string, name: string) {
  downloadFromUrl(dataUrl, name);
}
