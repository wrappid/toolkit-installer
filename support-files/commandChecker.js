//@ts-check
const { executeCommand } = require('./executeCommand');
const os = require("os");

/**
 * Command availability checker
 * 
 * @param {string} command - Command to check
 * @returns {boolean} - true if command is available, false otherwise
 */
const isCommandAvailable = (command) => {
    try {
        let commandChecker = os.platform() === 'win32' ? 'where' : 'which';
        let status = executeCommand(`${commandChecker} ${command}`, { stdio: 'ignore' });
        return status !== false;
    } catch (err) {
        return false;
    }
};


module.exports = { isCommandAvailable }