FROM node:4.6

COPY dist ~/cutting-edge

WORKDIR ~/cutting-edge

RUN NODE_ENV=production npm install

CMD NODE_ENV=production node ./server
