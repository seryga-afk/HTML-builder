const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');


const createFolder = path.join(__dirname, 'project-dist');
const createAssets = path.join(createFolder, 'assets');
const createCss = path.join(createFolder, 'style.css');
const createHtml = path.join(createFolder, 'index.html');


const components = path.join(__dirname, 'components');
const assets = path.join(__dirname, 'assets');
const styles = path.join(__dirname, 'styles');
const templateHtml = path.join(__dirname, 'template.html');



fs.access(createFolder, (error) => {
  if (error) {
    fsPromises.mkdir(createFolder);
    console.log('folder project-dist created!');
  } else {
    console.log('folder project-dist already exists!');
  }
});


async function createBundleHtml() {
  let updHtml = await fsPromises.readFile(templateHtml, 'utf-8');
  const files = await fsPromises.readdir(components, { withFileTypes: true });
    
  for (let i = 0; i < files.length; i++) {
    const component = await fsPromises.readFile(path.join(components, `${files[i].name}`), 'utf-8');
    updHtml = updHtml.replace(`{{${(files[i].name).split('.')[0]}}}`, component);
  }
  await fsPromises.writeFile(createHtml, updHtml);
}

let stylesCss = [];



async function createBundleCss(){
  const files = await fsPromises.readdir(styles, { withFileTypes: true });
  for (let i = 0; i < files.length; i++) {
    const currentFile = path.join(styles, files[i].name);     
    if (files[i].name.split('.')[1] === 'css' ) {
              
      const cssContent = await fsPromises.readFile(currentFile, 'utf8');
      stylesCss.push(cssContent);
    }
    await fsPromises.writeFile(createCss, stylesCss);
          
  }
}
  

async function copyDirr(fromDirr, toDirr) {
  
  const files = await fsPromises.readdir(fromDirr, { withFileTypes: true });
    
  
  for (let i = 0; i < files.length; i++) {
    const currentItem = path.join(fromDirr, files[i].name);
    const copyItem = path.join(toDirr, files[i].name);

    if (files[i].isDirectory()) {
      await fsPromises.mkdir(copyItem, { recursive: true });
      await copyDirr(currentItem, copyItem);
  
    } else if (files[i].isFile()) {
      await fsPromises.copyFile(currentItem, copyItem);
    }


          
  }
  
}


createBundleHtml();
createBundleCss();
copyDirr(assets,createAssets);
  