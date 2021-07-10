# specify node image
FROM node:alpine
RUN apk add --no-cache bash
RUN apk add --no-cache npm
RUN npm install -g nodemon

# expose docker instance on port 8888
EXPOSE 8888
