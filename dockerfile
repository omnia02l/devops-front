# Étape 1: Construire l'application Angular
FROM node:node:18-alpine as build

# Créer et définir le répertoire de travail
WORKDIR /front

# Copier les fichiers de configuration et de code source
COPY package*.json ./
COPY . .

# Installer les dépendances
RUN npm install

# Construire l'application Angular
RUN npm run build -- --prod

# Étape 2: Créer l'image finale
FROM nginx:alpine

# Copier les fichiers construits depuis l'étape précédente
COPY --from=build /app/dist/ /usr/share/nginx/html

# Exposer le port 80 pour l'accès à l'application
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
