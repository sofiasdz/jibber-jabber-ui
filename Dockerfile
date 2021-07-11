# stage1 as builder
FROM node:10-alpine as builder

# copy the package.json to install dependencies
COPY package.json ./
COPY package-lock.json ./
# Install the dependencies and make the folder
RUN  mv ./node_modules ./jibber-jabber-ui
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
RUN npm run build

WORKDIR /jibber-jabber-ui

COPY . .

# Build the project and copy the files
RUN yarn build


FROM nginx:alpine

#!/bin/sh


COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=builder /jibber-jabber-ui/build /usr/share/nginx/html

EXPOSE 3000 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]