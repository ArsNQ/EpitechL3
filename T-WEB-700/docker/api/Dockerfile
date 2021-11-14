## BUILD
FROM node:10-alpine

WORKDIR /api/

COPY ./api/package*.json ./

RUN npm install

COPY ./api ./

## RUN
CMD [ "npm", "start" ]

EXPOSE 8081
