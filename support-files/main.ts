import * as readline from 'readline';
import { checkPrerequisites } from './checkPreRequisites';
import { requestToken } from './tokenRequest';
import { isCommandAvailable } from './commandChecker';
import { setupWrappidToolkit } from './setupWrappidToolkit';

/**
 * @TODO: Remove repetitive object key access from utils
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
async function main(): Promise<void> {
  const [, , wrappidToken]: string[] = process.argv; // Assuming organization and token are 2nd and 3rd arguments

  // Check for missing arguments and prompt user
  const wrappidRegistryToken: string | null = wrappidToken || await getToken();

  /**
   * Retrieve Wrappid Registry Token
   * 
   * @returns {Promise<string | null>} - Wrappid Registry Token or null
   */
  async function getToken(): Promise<string | null> {
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
async function askForWrappidRegistryToken(question: string): Promise<string> {
  return new Promise(async (resolve) => {
    rl.question(question + " (Y/N): ", async (answer: string) => {
      const firstChar: string = answer.trim().toLowerCase()[0];
      if (firstChar === 'y') {
        rl.question("Enter your Wrappid Registry Token: ", (token: string) => {
          resolve(token);
        });
      } else if (firstChar === 'n') {
        await requestToken();
        rl.question("Enter your Wrappid Registry Token: ", (token: string) => {
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
