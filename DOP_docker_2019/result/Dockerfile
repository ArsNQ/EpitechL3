FROM node
EXPOSE 80

ADD views/* server.js package.json ./

RUN mkdir views
RUN cd views | mkdir stylesheets

RUN cd /

RUN mv app.js views/
RUN mv index.html views/
RUN mv socket.io.js views/
RUN mv style.css views/stylesheets

RUN npm install

CMD ["node", "server.js"]
