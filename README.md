# EduardoAPI - Me as an API

This is a **dead simple web server** that uses only node [HTTP](https://nodejs.org/api/http.html) module to build up the server. 

*I decided to not use Express.js to train myself on create a server without any dependencies (except from the "default" node modules - like https and fs that I used in this project).*

*This isn't a RESTfull API, is just a server that serves some data about me (author) that I made as a personal project to learn more about HTTP protocol and APIs.*


## Set up the server

Before cloning, inside the project directory:

- Simple set up:

  - Without docker (only [node.js](https://nodejs.org/en/) required):
    ```sh
    node app.js
    ```
  - With docker (only [docker](https://www.docker.com) required):
    ```sh
      docker build - < Dockerifile -t eduardoapi/app:latest
      docker run -it --rm -p 8888:8888 -v $(pwd):/app -w="/app" eduardoapi/app:latest /bin/bash
      npm start
    ```
- Live deloyment set up (*all changes saved in project files reload the server*):

    - Without docker ([npm](https://www.npmjs.com/) and [nodemon](https://www.npmjs.com/package/nodemon) required):
        ```sh
        npm run start:dev
        ```
    - With docker (only [docker](https://www.docker.com/) required):
      ```sh
      docker build - < Dockerifile -t eduardoapi/app:latest
      docker run -it --rm -p 8888:8888 -v $(pwd):/app -w="/app" eduardoapi/app:latest /bin/bash
      npm run start:dev
      ```

## Endpoint and functions

### Endpoint

Except if your environment has an defined port, the server will default to port 8888, and the default endpoint will be:

- `localhost:8888/api`, that will return all author's stored data

Any other endpoints will give user a default endpoint error message.

### Functions

- #### Beautify:

  Beautify defines tabulation on output JSON of API.

  - Valid options:<br>
    `true` - add tabulation.<br>
    `false` - don't add tabulation.<br>
    `<any>` - any other option will make beautify fallback to default (false).<br>
  
  - Usage: <br>
    `&beautify=<option>`.

  - Example: <br>
    `localhost:8888/api&beautify=true`, will return all author's data with tabulation.

- #### Query:

  Query define required data (API normally return all stored data) and can receive multiple arguments.

  - Valid arguments:<br>
    `name` - request author's complete name.<br>
    `birthDate`- request author's birth date.<br>
    `college` - request author's college.<br>
    `course` - request author's college course.<br>
    `linkedIn` - request author's LinkedIn link.<br>
    `github` - request author's GitHub link.<br>
    `email` - request author's email address.<br>
    `phoneNumber` - request author's phone number.<br>
    `birthLocal` - request author's birth local.<br>
    `timezone` - request author's current author's timezone.<br>
    `knowledgeRoll` - request author's knowledge rolls (languages and some technologies).<br>
    `all` - request all author's data.<br>
    `<empty>` - empty queries will fallback to default (all).

  - Usage: <br>
    `&query=<args>`

  - Notes:
    - Multiple arguments are supported, like `&query=name,email`;
    - `&query=<option>,`, `&query=name,` i.e, is considered bad syntax and will return error with no data;
    - `all` can not be called with any other argument and need to respect the previous note.

  - Examples: <br>
    `localhost:8888/api&query=name`, will return just author's complete name.
    `localhost:8888/api&query=name,email`, will return author's complete name and email.
    `localhost:8888/api&query=all`, will return all data.
