FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

CMD [ "npm", "run", "start" ]
