FROM node:22.5.1-alpine AS build

WORKDIR /app

COPY ./Frontend/package*.json ./
#COPY ./package*.json ./

RUN npm install --legacy-peer-deps

RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points

COPY ./Frontend/ ./
#COPY . .

RUN npm run build

FROM nginx:stable

#COPY default.conf /etc/nginx/conf.d
COPY --from=build /app/dist/client /usr/share/nginx/html
COPY ./Frontend/src/env.js /usr/share/nginx/html/

EXPOSE 80
