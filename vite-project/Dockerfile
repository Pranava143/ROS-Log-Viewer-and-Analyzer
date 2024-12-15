# Step 1: Use a Node.js image
FROM node:22 AS builder

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json files
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Build the application
RUN npm run build

# Step 7: Use a lightweight server to serve the built files
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

ENV PORT=80

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
