FROM node:23-slim

WORKDIR /app
COPY . .
RUN npm i

CMD ["npm", "start"]