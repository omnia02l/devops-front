# Étape 1 : Utiliser une image de Node.js version 18 pour construire l'application Angular
FROM node:18-alpine as build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json dans le conteneur
COPY package*.json ./

# Installer les dépendances npm pour l'application Angular
RUN npm install

# Copier tout le code source du projet Angular dans le conteneur
COPY . .

# Construire l'application Angular en mode production
RUN npm run build --prod

# Étape 2 : Utiliser une image Nginx pour servir l'application Angular
FROM nginx:alpine

# Copier les fichiers générés dans le répertoire par défaut de Nginx
COPY --from=build /app/dist/<nom-du-projet> /usr/share/nginx/html

# Exposer le port 80 pour l'accès HTTP
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
