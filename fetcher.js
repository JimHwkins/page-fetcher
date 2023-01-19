const request = require('request');
const fs = require('fs');
const args = process.argv.slice(2);
const url = args[0];
const path = args[1];
const readline = require('readline');

const requestFunction = () => {
  request(url, (error, response, body) => {
    console.log(error);
    console.log('Status Code:', response, response.statusCode);
  
    fs.writeFile(path, body, (err) => {
      if (err) {
        return console.log(err);
      }
      console.log(`Downloaded and saved ${body.length} bytes to ${path}`);
      process.exit();
    });
  
  });
};

const read = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

try {
  if (fs.existsSync(path)) {
    read.question('The file already exists. Overwrite? (y/n) ', (answer) => {
      if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === "y") {
        requestFunction();
      } else {
        read.close();
        console.log("Exiting...");
        return;
      }
      read.close();
    });
  } else {
    console.log('File not found');
    requestFunction();
  }
} catch (err) {
  console.error(err);
}

