#!/bin/node

const http = require('http');
const port = process.env.PORT || 8888;
const fs = require('fs');

const me = JSON.parse(fs.readFileSync('eduardo.json', 'utf-8'));

http.createServer((request, response) => {
    response.write(JSON.stringify(me, null, '\t'));
    response.end();

    const url = request.url;
    console.log(url);
}).listen(port, () => {
    console.log(`Listening on port ${port}`);
});
