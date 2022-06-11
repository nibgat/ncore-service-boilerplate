FROM node:16 as base
WORKDIR /usr/app
COPY . .

RUN chmod -R 777 /usr/app
RUN yarn

FROM base as production
RUN yarn build
RUN #!/bin/bash cp /usr/app/node_modules /usr/app/dist/
COPY ./locales/variants/* /usr/app/dist/locales/variants/
ENV NODE_ENV=production
ENV PORT=YOUR_APP_PORT
ENV SERVER_ADDRESS=https://YOUR_DOMAIN
ENV DOMAIN=YOUR_DOMAIN
EXPOSE YOUR_APP_PORT
CMD ["yarn", "start"]

FROM base as development
ENV NODE_ENV=development
ENV PORT=YOUR_APP_DEVELOPMENT_PORT
ENV SERVER_ADDRESS=http://localhost
EXPOSE YOUR_APP_DEVELOPMENT_PORT
CMD ["yarn", "dev"]
