FROM node:latest

ENV APP_ROOT /src

RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

RUN npm i
RUN npm run build

ENV HOST 0.0.0.0
