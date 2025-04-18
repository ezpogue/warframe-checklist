FROM node:20-alpine

WORKDIR /app

# Install dependencies early for caching
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the app
COPY . .

EXPOSE 8000

CMD ["npm", "run", "develop"]
