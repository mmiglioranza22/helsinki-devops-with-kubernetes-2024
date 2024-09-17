FROM --platform=linux/amd64 node:alpine

WORKDIR /usr/src/app

COPY package* ./

RUN npm ci

COPY . .

CMD ["npm", "start"]

# Common error: exec /usr/local/bin/docker-entrypoint.sh: exec format error --> Add platform on Dockerfile
# https://stackoverflow.com/questions/77355846/exec-usr-local-bin-docker-entrypoint-sh-exec-format-error
# https://stackoverflow.com/questions/73285601/docker-exec-usr-bin-sh-exec-format-error
