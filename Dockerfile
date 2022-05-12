# From node:14.19
FROM node:14.19

# Maintainer
LABEL key="MAINTAINER" value="YongkukKim <syntax-err@kakao.com>" 

# create & set workdir
WORKDIR /usr/src

# update
RUN apt-get update 

# install yarn
# RUN npm install --global yarn 
# node:14.19에 yarn 포함

# copy 
COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn
# copy project
COPY . .

RUN npm install -g lerna
# install packages
# TODO: CACHING
RUN yarn -W

# build
RUN yarn workspaces info
RUN yarn workspace backpackerz-frontend build

# EXPOSE
EXPOSE 3000

ENTRYPOINT ["/bin/bash", "./docker-entrypoint.sh"]