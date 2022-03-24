FROM node:17-slim

RUN apt-get update \
   && apt-get install sox libsox-fmt-mp3 -y

WORKDIR /spotify-streamdeck/

COPY package.json package-lock.json /spotify-streamdeck/

RUN npm ci --silent

COPY . . 

USER node

CMD npm run live-reload