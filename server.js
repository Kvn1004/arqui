    const http = require('http');
     
    // Create the server, and immediately listen
    http.createServer((req, res) => {  
      res.setHeader('Content-Type', 'text/plain');
      res.statusCode = 200;    
      res.end('Hello World\n');
    }).listen('127.0.0.1', 80);