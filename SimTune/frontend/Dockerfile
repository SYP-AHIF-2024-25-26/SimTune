FROM node:20 AS build

ARG API_URL
ENV ApiUrl=${API_URL}

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN sed -i "s|apiUrl: ''|apiUrl: '${API_URL}'|g" src/environments/environment.prod.ts
RUN npm run build

FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/sim-tune/browser /usr/share/nginx/html

