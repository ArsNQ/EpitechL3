# BUILD ENVIRONMENT
FROM node:12.2.0-alpine as build

WORKDIR /app
COPY ./app/package*.json ./

RUN npm install

COPY ./app ./

RUN npm run build

EXPOSE 8080
CMD [ "npm", "run", "serve" ]
