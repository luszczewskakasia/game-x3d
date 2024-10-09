// Include the server in your file
const server = require('server');
const { get, post } = server.router;
var http = require('http');
var fs = require('fs');

const PORT=8080; 

fs.readFile('./index_1.html', function (err, html) {

    if (err) throw err;    

    http.createServer(function(request, response) {  
        // response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(PORT);
});

// http://localhost:8080/ <- nasza stronka 

// // Handle requests to the url "/" ( http://localhost:3000/ )
// server([
//   get('/', ctx => 'Hello world!')
// ]);