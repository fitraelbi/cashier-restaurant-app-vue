FROM node:12.2.0-alpine as build
WORKDIR /app
COPY package.json /app/package.json
RUN yarn install --silent
RUN yarn add @vue/cli@3.7.0 -g
COPY . /app
RUN yarn run build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY https://github.com/fitraelbi/cashier-restaurant-app-vue/blob/master/nginx.config /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
