const fsPromises = require('fs/promises');
const path = require('path');

const toFile = path.join(__dirname, 'project-dist', 'bundle.css');
const fromFolder = path.join(__dirname, 'styles');
const styles = []


async function createBundleCss(){
    const files = await fsPromises.readdir(fromFolder, { withFileTypes: true });
    for (let i = 0; i < files.length; i++) {
        const currentFile = path.join(fromFolder, files[i].name);     
        if (files[i].name.split('.')[1] === 'css' ) {
            
            const cssContent = await fsPromises.readFile(currentFile, 'utf8');
            styles.push(cssContent)
        }
        await fsPromises.writeFile(toFile, styles);
        
    }
}
createBundleCss()
