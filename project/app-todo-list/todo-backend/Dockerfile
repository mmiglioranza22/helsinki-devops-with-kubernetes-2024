FROM --platform=linux/amd64 node:alpine

WORKDIR /usr/src/app

COPY package* ./

RUN npm install

COPY . .

CMD [ "npm", "run", "start" ]
