import {
  SelectScreenshotAreaData,
  SelectScreenshotAreaRequest,
} from './message_system';
import { ResponseResult, Rectangle } from '../../types';

export async function handleAsyncInTab(
  request: SelectScreenshotAreaRequest,
  sender: chrome.runtime.MessageSender
): Promise<ResponseResult<SelectScreenshotAreaData>> {
  try {
    const rectangle = await listenForOneClick();

    return {
      succeeded: true,
      data: {
        rectangle,
      },
    };
  } catch {
    return {
      succeeded: false,
      data: {
        rectangle: { x: 0, y: 0, height: 0, width: 0 },
      },
    };
  }
}

function addGlass() {
  const glass = document.createElement('div');
  glass.style.backgroundColor = 'blue';
  glass.style.opacity = '0.25';
  glass.style.position = 'absolute';
  glass.id = 'testing-glass';
  glass.style.zIndex = '1000000000';
  glass.style.pointerEvents = 'none';
  document.body.appendChild(glass);
  return glass;
}

function listenForOneClick(): Promise<Rectangle> {
  return new Promise((res, rej) => {
    const glass = addGlass();

    function updateGlass(event: MouseEvent) {
      if (!(event.target instanceof HTMLElement)) {
        return;
      }

      const { x, y, height, width } = event.target.getBoundingClientRect();

      glass.style.top = `${y + scrollY}px`;
      glass.style.left = `${x}px`;
      glass.style.width = `${width}px`;
      glass.style.height = `${height}px`;
    }

    function cleanup() {
      document.body.removeEventListener('click', handleClick, true);
      document.body.removeEventListener('mouseover', updateGlass, true);
      document.body.removeChild(glass);
    }

    function finish(event: MouseEvent) {
      if (event.target instanceof HTMLElement) {
        res(event.target.getBoundingClientRect());
      } else {
        rej('non html element selected');
      }
    }

    function handleClick(event: MouseEvent) {
      cleanup();
      event.stopPropagation();
      setTimeout(() => finish(event), 100);
    }

    document.body.addEventListener('click', handleClick, true);
    document.body.addEventListener('mouseover', updateGlass, true);
  });
}
