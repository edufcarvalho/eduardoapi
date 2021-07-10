#!/bin/node

const http = require('http');
const port = process.env.PORT || 8888;

http.createServer((request, response) => {
    response.write('<h1>Hello World</h1>');
    response.end();

    const url = request.url;
    console.log(url);
}).listen(port, () => {
    console.log(`Listening on port ${port}`);
});
