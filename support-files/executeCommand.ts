import { execSync } from 'child_process';

/**
 * Command execution function
 * 
 * @param {string} command - Command to execute
 * @param {object} options - Options for the command execution
 * @returns {string | boolean} - Output of the command or false if error
 */
function executeCommand(command: string, options: object = {}): string | boolean {
    try {
        const output = execSync(command, { encoding: 'utf-8', ...options });
        return output;
    } catch (error) {
        // console.error(`Error executing command: ${command}`);
        // console.error(error.message);
        return false;
    }
}

export { executeCommand };
