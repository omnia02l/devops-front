#Dockerfile
# Étape 1 : Utiliser Node.js pour construire l'application Angular
FROM node:18-alpine as build

WORKDIR /frontend

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Étape 2 : Utiliser Nginx pour servir l'application Angular
FROM nginx:alpine

COPY --from=build /frontend/dist/dance-scape-ex /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
