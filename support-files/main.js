//@ts-check

const readline = require('readline');
const { checkPrerequisites } = require('./checkPreRequisites');
const { requestToken } = require('./tokenRequest');
const { isCommandAvailable } = require('./commandChecker');
const { setupWrappidToolkit } = require('./setupWrappidToolkit');

/**
 * @TODO: Remove repeatative object key access from utils
 */

/**
 * Readline interface
 */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let shouldCloseRL = true; // Flag to determine if readline should be closed



/**
 * Main function
 */
async function main() {
  const [, , wrappidToken] = process.argv; // Assuming organization and token are 2nd and 3rd arguments

  // Check for missing arguments and prompt user
  const wrappidRegistryToken = wrappidToken || await getToken();
/**
 * Retrieve Wrappid Registry Token
 * 
 * @returns {Promise<string | null>} - Wrappid Registry Token or null
 */
async function getToken() {
  if (!wrappidToken) {
    if (!isCommandAvailable('wrappid')) {
      return await askForWrappidRegistryToken('Do you have wrappid registry token?');
    } else {
      // Return null or handle the case when isCommandAvailable('wrappid') returns true
      return null;
    }
  } else {
    return wrappidToken;
  }
}
  checkPrerequisites();

  if (wrappidRegistryToken) {
    if (!isCommandAvailable('wrappid')) {
      await setupWrappidToolkit(wrappidRegistryToken);
    }
  }

  // Close the readline interface if shouldCloseRL is true
  if (shouldCloseRL) {
    rl.close();
  }
}


/**
 * Ask user for Wrappid Registry Token
 * 
 * @param {string} question 
 * @returns {Promise<string>} - Wrappid Registry Token
 */
async function askForWrappidRegistryToken(question) {
  return new Promise(async (resolve) => {
    rl.question(question + " (Y/N): ", async (answer) => {
      const firstChar = answer.trim().toLowerCase()[0];
      if (firstChar === 'y') {
        rl.question("Enter your Wrappid Registry Token: ", (token) => {
          resolve(token);
        });
      } else if (firstChar === 'n') {

        await requestToken();
        rl.question("Enter your Wrappid Registry Token: ", (token) => {
          resolve(token);
        });
      } else {
        console.log("Invalid choice. Please enter 'Y' or 'N'.");
        await askForWrappidRegistryToken(question); // Ask again for a valid choice
      }
    });
  });
}
// Run the main function
main();

// Close the readline interface when interrupted
rl.on('close', () => {
  console.log('\nExiting...');
});

// Handle SIGINT signal (Ctrl+C) to prevent closing readline interface
process.on('SIGINT', () => {
  shouldCloseRL = false;
  process.exit();
});
