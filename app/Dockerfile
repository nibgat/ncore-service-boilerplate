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
ENV PORT=7376
ENV SERVER_ADDRESS=https://yardimnerede.com.tr
ENV DOMAIN=yardimnerede.com.tr
EXPOSE 7376
CMD ["yarn", "start"]

FROM base as development
ENV NODE_ENV=development
ENV PORT=7375
ENV SERVER_ADDRESS=http://localhost
EXPOSE 7375
CMD ["yarn", "dev"]
