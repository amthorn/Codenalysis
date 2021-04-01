FROM node:buster-slim
MAINTAINER Ava Thorn <avatheavian@gmail.com>

###########################
# BASE CONTAINER COMMANDS #
###########################

WORKDIR /codenalysis

RUN npm update -g npm
COPY package.json package.json

################
# INSTALLATION #
################

RUN npm install

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