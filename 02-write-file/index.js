const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });


const textOut = fs.createWriteStream(path.join(__dirname, 'textOut.txt'));

rl.write('Please enter text!\n');


rl.on('line', (text) => {
  if (text.trim() === 'exit'){
    rl.close();
  } 
  
  textOut.write(text + '\n');
});

rl.on('close', () => {
  process.exit();
});

process.on('exit', code => {
  if (code === 0) {
    console.log('Thank you for your attention!');
  } else {
    console.log(`Something went wrong ${code}`);
  }
});
