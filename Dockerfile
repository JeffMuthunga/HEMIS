# Use an official Node.js image as the base with a compatible version
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Update npm and install dependencies
RUN npm install --force

# Copy the entire project directory
COPY . .

# Build the app
RUN npm run build

# Serve the app using NGINX
FROM nginx:1.21-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
