# Common build stage
FROM node:18.9.0-buster-slim as common-build-stage

RUN apt-get update \
        && apt-get install -y \
        npm \
        yarn \
        git \
        rsync \
        lsof \
        net-tools \
        procps \
        htop

# https://burnedikt.com/dockerized-node-development-and-mounting-node-volumes/#improving-the-workaround
# https://github.com/BretFisher/node-docker-good-defaults
WORKDIR /usr/local

COPY package*.json ./

RUN npm install pm2 -g
RUN npm ci && npm cache clean --force

ENV PATH=/usr/local/node_modules/.bin:$PATH
WORKDIR /usr/local/app

EXPOSE 3000

# Devlopment build stage
FROM common-build-stage as development-build-stage

ENV NODE_ENV development

CMD ["sh","-c","rm -rf /usr/local/app/node_modules/*;npm i;npm run build;npm run start:dev;tail -f /dev/null"]

# Debug build stage
FROM common-build-stage as debug-build-stage

ENV NODE_ENV development

CMD ["sh","-c","rm -rf /usr/local/app/node_modules/*;npm i;npm run build;npm run start:debug;tail -f /dev/null"]

# Production build stage
FROM common-build-stage as production-build-stage

ENV NODE_ENV production

CMD ["sh","-c","rm -rf /usr/local/app/node_modules/*;npm i;npm run build;pm2-runtime start ecosystem.config.js --watch;tail -f /dev/null"]

