# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Accept build arguments for Vite environment variables
ARG VITE_PRODUCT_SERVICE_URL
ARG VITE_SEGMENT_SERVICE_URL

# Make them available as environment variables during build
ENV VITE_PRODUCT_SERVICE_URL=$VITE_PRODUCT_SERVICE_URL
ENV VITE_SEGMENT_SERVICE_URL=$VITE_SEGMENT_SERVICE_URL

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]