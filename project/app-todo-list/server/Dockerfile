FROM node:alpine

WORKDIR /usr/src/app

COPY package* ./

RUN npm install

COPY . .

CMD ["npm", "start"]

# FROM node:alpine

# WORKDIR /usr/src/app

# COPY . .

# RUN npm install
# # Create a group and user for alpine
# RUN adduser -D appuser
# # change the owner of current dir to appuser
# RUN chown appuser .

# # Tell docker that all future commands should run as the appuser user
# USER appuser
# CMD ["npm", "start"]
