# Étape 1 : Utiliser une image Node.js pour construire l'application Angular
FROM node:16-alpine as build

WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le code source
COPY . .

# Construire l'application Angular pour la production
RUN npm run build --prod

# Étape 2 : Utiliser Nginx pour servir l'application
FROM nginx:alpine

# Copier les fichiers construits dans le répertoire de Nginx
COPY --from=build /app/dist/<nom-du-projet> /usr/share/nginx/html

# Exposer le port 80 pour accéder à l'application
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
