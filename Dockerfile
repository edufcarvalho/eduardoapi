# specify node image
FROM node:alpine
RUN apk add --no-cache bash
RUN apk add --no-cache npm
RUN npm install -g nodemon
USER node

WORKDIR /app
COPY . .

# define entrypoint to 'npm run'
ENTRYPOINT [ "npm", "run" ]

# make defult run to 'npm run start'
CMD [ "start" ]

# expose docker instance on port 8888
EXPOSE 8888
