const http = require('http');
const fs = require('fs');



http.createServer((request, response) => {
    if (request.url == '/registry') {
        let data = [];
        request.on('data', (value) => {
            data.push(value);
        }).on('end', () => {
            let params = Buffer.concat(data).toString();
            response.writeHead(200, { "Content-Type": "text/plain" });
            response.write(params);
            response.end();
        });
    } else {
        const filename = request.url == '/'
            ? './WWW/index.html'
            : `./WWW${request.url}`;
        console.log("./WWW/index.html", "./WWW/index.html" == filename, filename)
        fs.readFile(filename, (err, data) => {
            if (err) {
                response.writeHead(404, { "Content-Type": "text/plain" });
                response.write("Not Found");
                response.end();
            } else {
                const extension = request.url.split('.').pop();
                switch (extension) {
                    case 'txt':
                        response.writeHead(200, { "Content-Type": "text/plain" });
                        break;
                    case 'html':
                        response.writeHead(200, { "Content-Type": "text/html" });
                        break;
                    case 'css':
                        response.writeHead(200, { "Content-Type": "text/css" });
                        break;
                    case 'js':
                        response.writeHead(200, { "Content-Type": "text/javascript" });
                        break;
                    case 'jpeg':
                        response.writeHead(200, { "Content-Type": "image/jpeg" });
                        break;
                }
                response.write(data);
                response.end();
            }
        });
    }

}).listen(4444);
