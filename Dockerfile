###
# Build step
###
FROM mattanddev/node-puppeteer:latest AS build
WORKDIR /app

# npm/git setup
COPY package*.json ./

# npm install
RUN npm i --silent
COPY . .

RUN npm run measure
RUN npm run compile:api


###
# App
###
FROM node:12
WORKDIR /var/www

COPY --from=build /app/dist /var/www/dist
COPY --from=build /app/node_modules /var/www/node_modules
# RUN ls -a /var/www/app/dist/api
RUN ls -a /var/www/dist
RUN ls -a /var/www/dist/api
EXPOSE 3333

# run
ENTRYPOINT ["node", "dist/api/index.js"]
