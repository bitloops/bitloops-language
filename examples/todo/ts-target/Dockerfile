FROM node:16.19-alpine3.16

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 5001 5001

EXPOSE 5002 5002

#Build the project
RUN yarn build

# Run node server
CMD yarn start