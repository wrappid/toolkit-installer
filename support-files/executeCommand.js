//@ts-check
const { execSync } = require('child_process');

/**
 * Command execution function
 * 
 * @param {string} command - Command to execute
 * @returns {string | boolean} - Output of the command or false if error
 */
function executeCommand(command, options = {}) {
    try {
        const output = execSync(command, { encoding: 'utf-8', ...options });
        return output;
    } catch (error) {
        // console.error(`Error executing command: ${command}`);
        // console.error(error.message);
        return false;
    }
}

module.exports = { executeCommand };