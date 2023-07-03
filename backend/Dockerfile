FROM node:18-alpine3.15
WORKDIR /app
COPY *.json /app/ 
RUN npm install  
COPY . ./
EXPOSE 3000
CMD [ "npm","start" ]