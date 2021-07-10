#!/bin/node

const http = require('http');
const port = process.env.PORT || 8888;
const fs = require('fs');

const eduardo = JSON.parse(fs.readFileSync('eduardo.json', 'utf-8'));

http.createServer((request, response) => {
    const params = new URLSearchParams(request.url);

    /* Ignoring favicon requests, maybe I will create a Express.js 
    version that set one server-favicon or find out a way to handle it */
    if (params.has('/favicon.ico')) {
        return;
    }

    const beautify = params.get('beautify') == 'true' ? '\t' : null;

    if (params.has('/api')) {
        const data = {};

        if (params.has('query')) {
            for (key of params.get('query').split(',')) {
                if (eduardo.hasOwnProperty(key)) {
                    data[key] = eduardo[key];
                } else {
                    response.write(
                        JSON.stringify(
                            {
                                success: false,
                                error: {
                                    code: 202,
                                    type: 'invalid_query',
                                    info: `Invalid query provided. Valid queries: ${Object.keys(
                                        eduardo
                                    ).join()}`
                                }
                            },
                            null,
                            beautify
                        )
                    );
                    response.end();
                    return;
                }
            }

            response.write(JSON.stringify(data, null, beautify));
        } else {
            response.write(JSON.stringify(eduardo, null, beautify));
        }
    } else {
        response.write(
            JSON.stringify(
                {
                    success: false,
                    error: {
                        code: 202,
                        type: 'invalid_endpoint',
                        info: `Invalid endpoint provided. Consult documentation for further information.`
                    }
                },
                null,
                beautify
            )
        );
        response.end();
        return;
    }

    response.end();
}).listen(port, () => {
    console.log(`Listening on port ${port}`);
});
