const fsPromises = require('fs/promises');
const path = require('path');
const fs = require('fs');

const fromFolder = path.join(__dirname, 'files');
const toFolder = path.join(__dirname, 'files-copy');

fs.access(toFolder, (error) => {
    if (error) {
      fsPromises.mkdir(toFolder);
      console.log('folder files-copy created!');
    } else {
      console.log('folder files-copy already exists!');
    }
  });


async function copyDirr(fromDirr, toDirr) {
  
    const files = await fsPromises.readdir(fromDirr, { withFileTypes: true });
  

    for (let i = 0; i < files.length; i++) {
        const currentItemPath = path.join(fromDirr, files[i].name);
        const copyItemPath = path.join(toDirr, files[i].name);
        if (files[i].isFile()) {
            await fsPromises.copyFile(currentItemPath, copyItemPath)
        }
        
    }

  }
  copyDirr(fromFolder,toFolder)