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
