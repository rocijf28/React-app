# Stap 1: Bouwen van de applicatie
FROM node:14 AS build
WORKDIR /react-app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stap 2: Serveren van de gecompileerde applicatie
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]