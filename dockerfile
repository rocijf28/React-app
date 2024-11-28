# Stap 1: Bouwen van de applicatie
FROM node:14 AS build
WORKDIR /react-app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build