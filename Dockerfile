FROM keymetrics/pm2:8-alpine

RUN mkdir ~/apps
ADD tax_lookup ~/apps/tax_lookup 

WORKDIR ~/apps/tax_lookup

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production

CMD [ "pm2-runtime", "start", "pm2.json" ]