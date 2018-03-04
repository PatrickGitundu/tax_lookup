FROM node:8-alpine

RUN 
RUN mkdir ~/apps
RUN cd ~/apps
COPY

RUN npm install
RUN npm install pm2 -g

RUN pm2 start 
