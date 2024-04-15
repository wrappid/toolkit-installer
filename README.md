# wrappid-toolkit-installer

This is an installer for the @wrappid/toolkit.

This installer can be used to install, update and repair the @wrappid/toolkit.

## Get the Installer

Download the latest wrappid-toolkit-installer from [here](https://github.com/wrappid/toolkit-installer/releases/latest).

Choose the correct file (.zip or .tz) based on your OS requirement.

## Know your Installer

Upon extracting you will find the below files:

| Filename | Use |
|---|---|
| support-files | This is a directory containing all supported files needed for the installer to work |
| README.md | This is "this" file, which you are reading right now |
| wrappid-toolkit-installer.cmd | Installer executable for Windows platform |
| wrappid-toolkit-installer.sh | Installer executable for Linux or Mac platform |

## Pre-requisites

Before running this installer make sure you have the following software(s) installed:

- Node.js 16.20 or higher: [Download and install Node.js](https://nodejs.org/)
- GitHub CLI: [Install GitHub CLI](https://cli.github.com/)
- Git: [Install Git](https://git-scm.com/)

## Run the Installer

1. Open a `cmd` or `terminal`
2. Navigate to the directory where the Installer executables are located
3. Run the following command:

### Windows
```cmd
wrappid-toolkit-installer.cmd
```
OR simply double click on _wrappid-toolkit-installer.cmd_ file. It's that easy.

### Linux or Mac
```bash
./wrappid-toolkit-installer.sh
```
Follow prompts as the installer runs and ends.

That's it! The latest version of @wrappid/toolkit should now be globally installed on your system.

### Verify
1. Open a `cmd` or `terminal`
2. Run the following command:
```cmd
wrappid --version
```
This should show the version of the toolkit that just now got installed and is available in your system.

### Get in touch
For any problems or suggestions, feel free to create an issue.
