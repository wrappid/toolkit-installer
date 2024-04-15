const { executeCommand } = require('./executeCommand');

function openBrowser(url) {
  // Validate URL format to prevent potential security issues
  if (!/^https?:\/\//.test(url)) {
    console.error('Invalid URL format. Please provide a valid https:// or http:// URL.');
    return;
  }

  let command;
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
  // spawnSync(command, [url]);
}

async function requestToken() {
  // waitTwoSeconds();
  console.log("A form will open in your default browser, please fill it out to get your Wrappid Registry Token in your email. \n Press enter to open the form...");
  await waitForEnter();
  console.log("Opening the form in your default browser...");
  await waitTwoSeconds();
  const targetUrl = 'https://wrappid.dev/wrappid-early-access-request-form';
  openBrowser(targetUrl);
}

function waitTwoSeconds() {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  });
}



function waitForEnter() {
  return new Promise(resolve => {
    process.stdin.once('data', () => {
      resolve();
    });
  });
}
module.exports = { requestToken }
