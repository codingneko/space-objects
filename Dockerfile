FROM node:14-alpine3.16
WORKDIR ~/space-objects
COPY . .
RUN mkdir data
RUN chmod +x updateScript.sh
RUN apk add --no-cache wget
RUN npm install
EXPOSE 8080
CMD npm start