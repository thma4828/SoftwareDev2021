const fs = require('fs');
const mime = require('mime');
const http = require('http');
const url = require('url');
const path = require('path');

const rootDirectory = path.resolve(process.argv[2] || './');
const file_set = new Set();
const port = 3000;
const server = http.createServer();

server.on('request', (request, response) =>{
  const requestURL = url.parse(request.url);
  const requestPath = path.join(requestURL.pathname);
  if(!file_set.has(requestPath)){
    console.log(`[404] file not found: (${requestURL.href})`);
    response.writeHead(404); //error 404 is http code for file not found.
    response.end();
    return;
  }
  const fType = mime.getType(path.extname(requestPath));
  console.log(`[200] file (${requestURL.href}) found with content-type: ${fType}`);
  const readStream =
      fs.createReadStream(path.join(rootDirectory, requestPath))
      .pipe(response); //pipe the readStreams data into the response object (I guess its a stream?);
});

function walkDirectory(dirPath, callback){
  const dirents = fs.readdirSync(dirPath, {withFileTypes: true});
  dirents.forEach((dirent) => {
      if(dirent.isDirectory()){
        walkDirectory(path.join(dirPath, dirent.name), callback);
      }else{
        callback(path.join(dirPath, dirent.name)); //callback is only called on each file!
      }
  });
}

walkDirectory(rootDirectory, (file) => {
  file = file.substr(rootDirectory.length); //clean up file name with full path.
  file_set.add(file);
});
console.log(`Found [${file_set.size}] files in ${rootDirectory}`);

server.listen(port);
console.log('server listening on port: [%d]', port);
