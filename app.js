#!/bin/node

const http = require('http');
const fs = require('fs');
const port = process.env.PORT || 8888;

const eduardo = JSON.parse(fs.readFileSync('eduardo.json', 'utf-8'));

const writeErrorToOutput = (output, code, errorType, errorDescription) => {
    output.success = false;
    output.error = {
        code: code,
        type: errorType,
        info: errorDescription
    };

    delete output.data;
};

http.createServer((request, response) => {
    const params = new URLSearchParams(request.url);

    /* ignoring favicon requests, maybe I will create a Express.js 
    version that set one server-favicon or find out a way to handle it */
    if (params.has('/favicon.ico')) {
        return;
    }

    /* if flag &beautify=true is provided, start beautify to allow
    tabulation on JSON.stringify() */
    const beautify = params.get('beautify') == 'true' ? '\t' : null;

    /* output JSON */
    const output = {
        success: true,
        data: {}
    };

    if (params.has('/api')) {
        if (params.has('query')) {
            /* iterate through all passed queries searching for invalid keys,
            if a key is invalid, send user a error message in the form of a JSON*/
            for (key of params.get('query').split(',')) {
                if (eduardo.hasOwnProperty(key)) {
                    output.data[key] = eduardo[key];
                } else {
                    writeErrorToOutput(
                        output,
                        (code = 202),
                        (type = 'invalid_query'),
                        (info = `Invalid query provided. Valid queries: ${Object.keys(
                            eduardo
                        ).join()}`)
                    );

                    break;
                }
            }
        } else {
            output.data = eduardo;
        }
    } else {
        writeErrorToOutput(
            output,
            (code = 202),
            (type = 'invalid_endpoint'),
            (info =
                'Invalid endpoint used. Consult documentation for further information.')
        );
    }

    response.write(JSON.stringify(output, null, beautify));
    response.end();
}).listen(port, () => {
    console.log(`Listening on port ${port}`);
});
