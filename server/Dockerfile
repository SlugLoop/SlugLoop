# Use the official Node.js image as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /usr/src/slugloop

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application files to the working directory
COPY . .

# Set the environment variables
ENV PORT=3051

# Expose the application port
EXPOSE 3051

# Start the application
CMD ["npm", "start"]