# Step 1: Use Node.js to build the Angular application
FROM node:18-alpine as build

# Set the working directory in the container
WORKDIR /frontend

# Copy package.json and package-lock.json files to install dependencies
COPY package*.json ./

# Install npm dependencies for the Angular project
RUN npm install

# Copy the Angular project files
COPY . .

# Build the Angular application in production mode
RUN npm run build --prod

# Step 2: Use Nginx to serve the Angular application
FROM nginx:alpine

# Copy the built Angular files from the previous stage to Nginx
COPY --from=build /frontend/dist/dance-scape-ex /usr/share/nginx/html

# Expose port 80 for HTTP
EXPOSE 4200

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]