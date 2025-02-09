FROM node:18-alpine

WORKDIR /app

# Install dependencies first (caching)
COPY package*.json ./
RUN npm install --production

# Copy source
COPY . .

# Create volume for auth data
VOLUME ["/app/auth_info"]

# Expose port (if needed)
EXPOSE 3000

CMD ["npm", "start"] 