FROM node:14-alpine3.16
WORKDIR /home/node/space-objects
COPY . .
RUN chmod +x updateScript.sh
RUN apk add --no-cache wget
RUN npm install
EXPOSE 8080
CMD npm start
