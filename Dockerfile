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

RUN npm run build --production

# ============================================================
FROM node:8.6.0-alpine

RUN mkdir /app
WORKDIR /app

COPY --from=0 /build-app/build .

# Build for production.
RUN npm install -g serve

ENV REACT_APP_API_URL=http://data.anansi.clariah.nl/v5/graphql
ENV REACT_APP_LOGIN_URL=https://secure.huygens.knaw.nl/saml2/login

# Set the command to start the node server.
CMD sh -c 'echo "window.dynamicEnv = {REACT_APP_API_URL: '"'"'$REACT_APP_API_URL'"'"', REACT_APP_LOGIN_URL='"'"'$REACT_APP_LOGIN_URL'"'"'};" > dynamic_env.js && serve -s -p 80'

# Tell Docker about the port we'll run on.
EXPOSE 80