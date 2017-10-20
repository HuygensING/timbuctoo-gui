FROM node:8.4.0

RUN mkdir /build-app

WORKDIR /build-app

# Copy all local files into the image.
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install

COPY ./public ./public
COPY ./src ./src
COPY ./tsconfig.json .
COPY ./tslint.json .
COPY ./.env .

ARG REACT_APP_API_URL
RUN npm run build --production

# ============================================================
FROM node:8.6.0-alpine

RUN mkdir /app
WORKDIR /app

COPY --from=0 /build-app/build .

# Build for production.
RUN npm install -g serve

# Set the command to start the node server.
CMD serve -s -p 80

# Tell Docker about the port we'll run on.
EXPOSE 80