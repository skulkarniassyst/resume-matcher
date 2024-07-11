# Use an official Node.js runtime as a parent image
FROM node:16 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install HTTP client for node.js
RUN npm install axios

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Debug step to list contents of /app directory
RUN ls -la /app
RUN ls -la /app/dist

# Use an official Nginx image to serve the built application
FROM nginx:alpine

# Copy the build output to the Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
