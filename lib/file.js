import { colors } from './terminalColors.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const file = {};
/**
 * 
 * @param {string} dir 
 * @param {string} fileName 
 * @returns {string} Absolute path
 */
file.fullPath = (dir, fileName) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    return path.join(__dirname, '../data', dir, fileName);
}

file.fullPublicPath = (trimmedFilePath) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    return path.join(__dirname, '../public', trimmedFilePath);
}

/**
 * Create new file if it's not yet in specified dir
 * @param {string} dir Relative... ex.:/data/users
 * @param {string} fileName File name with extension... ex.: main.json
 * @param {object} content Whatever is inside the the object... ex.: {'a': 'John'}
 * @returns {} File has been created
*/
file.create = async (dir, fileName, content) => {
    let fileDescriptor = null
    try {
        const fileDescriptor = await fs.open(file.fullPath(dir, fileName), 'wx')
        await fs.writeFile(fileDescriptor, JSON.stringify(content))
        console.log(`${colors.FgGreen}%s\x1b`, `<--${fileName} Created`);
    } catch (e) {
        console.log(`${colors.FgRed}%s\x1b[0m`, '---Error--- Create Unsuccesful');
    } finally {
        if (fileDescriptor) fileDescriptor.close();
        console.log('end')
        return false
    }
}

file.read = async (dir, fileName) => {
    try {
        const fileContent = await fs.readFile(file.fullPath(dir, fileName), 'utf-8');
        return fileContent;
    } catch (e) {
        console.log(`${colors.FgRed}%s\x1b[0m`, `---Error--- ${fileName} - Page Not Found`);
        return false;
    }
}
file.readPublic = async (trimmedFilePath) => {
    try {
        const fileContent = await fs.readFile(file.fullPublicPath(trimmedFilePath), 'utf-8');
        return fileContent;
    } catch (e) {
        console.log(`${colors.FgRed}%s\x1b[0m`, `---Error--- Pub Page Not Found`);
        return false;
    }
}
file.readPublicBinary = async (trimmedFilePath) => {
    try {
        const fileContent = await fs.readFile(file.fullPublicPath(trimmedFilePath));
        return fileContent;
    } catch (e) {
        console.log(`${colors.FgRed}%s\x1b[0m`, `---Error--- Binary Page Not Found`);
        return false, e;
    }
}

file.update = async (dir, fileName, content) => {
    try {
        const fileDescriptor = await fs.open(file.fullPath(dir, fileName), 'r+')
        await fileDescriptor.truncate();
        await fs.writeFile(fileDescriptor, JSON.stringify(content))
        console.log(`${colors.FgCyan}%s\x1b`, `<--${fileName} Updated`);
    } catch (e) {
        console.log(`${colors.FgRed}%s\x1b[0m`, `---Error--- ${fileName} - Failed to Update`);
        return false;
    }
}

file.delete = async (dir, fileName) => {
    try {
        await fs.unlink(file.fullPath(dir, fileName))
        console.log(`${colors.FgMagenta}%s\x1b`, `<--${fileName} Deleted`);
    } catch (e) {
        console.log(`${colors.FgRed}%s\x1b[0m`, `---Error--- ${fileName} - Failed to Delete`);
        return false;
    }
}

export { file };