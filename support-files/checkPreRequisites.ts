import { isCommandAvailable } from "./commandChecker";

/**
 * Check pre-requisites
 */
function checkPrerequisites() {
    console.log('Checking pre-requisites');
    if (isCommandAvailable('git') && isCommandAvailable("gh") && isCommandAvailable('npm')) {
        console.log('All pre-requisites are installed');
    } else {
        console.log('Please install all the pre-requisites');
        process.exit(1);
    }
}

export { checkPrerequisites };
