const http = require('http');
const fs = require('fs');
const port = process.env.PORT || 8888;

const eduardo = JSON.parse(fs.readFileSync('eduardo.json', 'utf-8'));

class BadRequest extends Error {
    constructor(code, type, message) {
        super(message);
        this.code = code;
        this.type = type;
    }

    toObject() {
        return {
            success: false,
            error: {
                code: this.code,
                type: this.type,
                info: this.message
            }
        };
    }
}

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

    try {
        /* default output JSON */
        const output = {
            success: true,
            data: {}
        };

        if (params.has('/api')) {
            if (params.has('query')) {
                const query = params.get('query');

                /* If query is empty or all, return default value (all data output) */
                if (query == '' || query == 'all') {
                    output.data = eduardo;
                } else {
                    /* iterate through all passed queries searching for invalid keys,
                    if a key is invalid, send user a error message in the form of a JSON*/
                    for (key of query.split(',')) {
                        if (eduardo.hasOwnProperty(key)) {
                            output.data[key] = eduardo[key];
                        } else {
                            throw new BadRequest(
                                (code = 202),
                                (type = 'invalid_query'),
                                (info = `Invalid query provided. Valid queries: ${Object.keys(
                                    eduardo
                                ).join()}`)
                            );
                        }
                    }
                }
            } else {
                output.data = eduardo;
            }
        } else {
            throw new BadRequest(
                (code = 202),
                (type = 'invalid_endpoint'),
                (info = 'Invalid endpoint used. Consult documentation for further information.')
            );
        }

        response.write(JSON.stringify(output, null, beautify));
    } catch (e) {
        if (e instanceof BadRequest) {
            /* If error is a BadRequest, return it's object to user */
            response.write(JSON.stringify(e.toObject(), null, beautify));
        } else {
            /* If a unexpected error is thrown, return code 500 (Internal Error) to user */
            response.write(
                JSON.stringify(
                    new BadRequest(
                        (code = 500),
                        (type = 'unexpected_error'),
                        (info = 'A unexpected error occurred, try again.')
                    ).toObject(),
                    null,
                    beautify
                )
            );
        }
    } finally {
        response.end();
    }
}).listen(port, () => {
    console.log(`Listening on port ${port}`);
});
