const fsPromises = require('fs/promises');
const path = require('path');

async function fileString() {
  const files = await fsPromises.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true });

  for (let i = 0; i < files.length; i++) {

    if (files[i].isFile()) {
            
      const pathToFile = path.join(__dirname, 'secret-folder', files[i].name);
      const stats = await fsPromises.stat(pathToFile);
    
    
      console.log(`${files[i].name.split('.')[0]} - ${files[i].name.split('.')[1]} - ${stats.size}b`);
    }
        
  }
}

fileString();





