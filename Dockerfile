FROM node:16-alpine as builder

WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY --from=builder /app/dist /app/dist
ENV HTTP_PORT 3099
EXPOSE ${HTTP_PORT}
CMD ["npm", "start"]
