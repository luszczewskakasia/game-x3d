// Include the server in your file
const server = require('server');
const { get, post } = server.router;
var http = require('http');
var fs = require('fs');

const PORT=8080; 


fs.readFile('index.html', function (err, html) {
    if (err) throw err;    

    http.createServer(function(request, response) {  
        // response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(PORT,()=> {
        console.log(`Serwer działa na porcie ${PORT}`);
        console.log(`Skrypt uruchomiony w folderze: ${__dirname}`);
    });
});

// http://localhost:8080/ <- nasza stronka 
