# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15
COPY  /dist/front /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY  /nginx.conf /etc/nginx/conf.d/default.conf