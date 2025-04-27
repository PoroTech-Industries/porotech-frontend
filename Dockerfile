FROM node:23-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

RUN npm run build -- --configuration=production




FROM nginx:stable-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist/porotech-frontend/browser /usr/share/nginx/html
RUN \
  chown -R nginx:nginx /usr/share/nginx/html && \
  find /usr/share/nginx/html -type d -exec chmod 755 {} \; && \
  find /usr/share/nginx/html -type f -exec chmod 644 {} \;
HEALTHCHECK --interval=10s --timeout=5s --start-period=5s --retries=5 \
CMD curl -f http://localhost/healthcheck || exit 1
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]