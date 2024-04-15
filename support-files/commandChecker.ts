import { executeCommand } from './executeCommand';
import * as os from "os";

/**
 * Command availability checker
 * 
 * @param {string} command - Command to check
 * @returns {boolean} - true if command is available, false otherwise
 */
function isCommandAvailable(command: string): boolean {
    try {
        let commandChecker = os.platform() === 'win32' ? 'where' : 'which';
        let status = executeCommand(`${commandChecker} ${command}`, { stdio: 'ignore' });
        return status !== false;
    } catch (err) {
        console.log(`Command ${command} unknown.`);
        
        return false;
    }
};

export { isCommandAvailable };
