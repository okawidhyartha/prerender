FROM node:20.11-alpine3.19

RUN mkdir /var/prerender
WORKDIR /var/prerender

RUN apk update
RUN apk add chromium

ADD lib ./lib
ADD server.js .
ADD package.json .

RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]
