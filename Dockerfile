FROM node:16-alpine as builder

WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM node:16-alpine
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY --from=builder /app/dist /app/dist
ENV PORT 3099
EXPOSE ${PORT}
CMD ["npm", "start"]
