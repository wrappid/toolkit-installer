import { executeCommand } from './executeCommand';
import * as path from "path";

//@ts-check

/**
 * Installs the Wrappid toolkit globally
 * @param {string} wrappidRegistryToken - Wrappid registry token
 */
async function setupWrappidToolkit(wrappidRegistryToken: string) {
  executeCommand('npm config set @wrappid:registry https://npm.pkg.github.com/wrappid');
  executeCommand('npm config set //npm.pkg.github.com/:_authToken ' + wrappidRegistryToken);
  console.log("Installing @wrappid/toolkit...");
  executeCommand('npm install -g @wrappid/toolkit');
  console.log("Almost done...");
  executeCommand('wr install');
  console.log("Done");
}

export { setupWrappidToolkit };
