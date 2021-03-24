FROM node:15.11.0-alpine

###########################
# BASE CONTAINER COMMANDS #
###########################

WORKDIR /codenalysis

RUN npm update -g npm
RUN npm install --save react-scripts sass@1.32.8

################
# INSTALLATION #
################

COPY package.json package.json
RUN npm install --save

################
# VOLUME MOUNT #
################

COPY src src
COPY public public
COPY jsconfig.json jsconfig.json

##############
# ENTRYPOINT #
##############

ENTRYPOINT ["npm"]
CMD ["start"]