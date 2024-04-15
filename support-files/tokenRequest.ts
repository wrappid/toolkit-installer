import { executeCommand } from './executeCommand';

/**
 * Opens the provided URL in the default browser
 * 
 * @param {string} url - URL to open in the browser
 * @returns 
 */
function openBrowser(url: string): void {
  // Validate URL format to prevent potential security issues
  if (!/^https?:\/\//.test(url)) {
    console.error('Invalid URL format. Please provide a valid https:// or http:// URL.');
    return;
  }

  let command: string;
  switch (process.platform) {
    case 'darwin':
      command = 'open';
      break;
    case 'win32':
      command = 'start "" ';
      break;
    case 'linux':
      command = 'xdg-open';
      break;
    default:
      console.error('Unsupported platform. Browser opening functionality not available.');
      return;
  }
  executeCommand(`${command} ${url}`);
}

/**
 * Requests the Wrappid Registry Token
 */
async function requestToken(): Promise<void> {
  console.log("A form will open in your default browser, please fill it out to get your Wrappid Registry Token in your email. \n Press enter to open the form...");
  await waitForEnter();
  console.log("Opening the form in your default browser...");
  await waitTwoSeconds();
  const targetUrl = 'https://wrappid.dev/wrappid-early-access-request-form';
  openBrowser(targetUrl);
}

/**
 * Waits for 2 seconds
 * 
 * @returns - Promise that resolves after 2 seconds 
 */
function waitTwoSeconds(): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  });
}

/**
 * Waits for the user to press enter
 * 
 * @returns - Promise that resolves when the user presses enter
 */
function waitForEnter(): Promise<void> {
  return new Promise(resolve => {
    process.stdin.once('data', () => {
      resolve();
    });
  });
}

export { requestToken };
