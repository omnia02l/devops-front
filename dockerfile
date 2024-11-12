# Étape 1: Construire l'application Angular
FROM node:18-alpine as build


# Créer et définir le répertoire de travail
WORKDIR /front

# Copier uniquement les fichiers nécessaires (dépendances) pour utiliser le cache de Docker
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application (les sources)
COPY . .

# Construire l'application Angular
RUN npm run build --prod


# Étape 2: Créer l'image finale
FROM nginx:alpine

# Copier les fichiers construits depuis l'étape précédente
COPY --from=build /front/dist/dance-scape-ex /usr/share/nginx/html

# Exposer le port 80 pour l'accès à l'application
EXPOSE 4200

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
