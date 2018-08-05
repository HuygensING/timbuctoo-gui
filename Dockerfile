FROM node:8.4.0

RUN mkdir /build-app

WORKDIR /build-app

# Copy all local files into the image.
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install

COPY ./public ./public
COPY ./src ./src
COPY ./tsconfig.prod.json .
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

ENV REACT_APP_PRIMARY_COLOR=#269075
ENV REACT_APP_TEXT_EN_TITLE="We care for your data"
ENV REACT_APP_TEXT_EN_LEADER_TEXT="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam consequatur cumque dolorem doloribus esse exercitationem fugit molestias possimus recusandae vitae?"
ENV REACT_APP_TEXT_NL_TITLE="Wij houden van jouw data"
ENV REACT_APP_TEXT_NL_LEADER_TEXT="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam consequatur cumque dolorem doloribus esse exercitationem fugit molestias possimus recusandae vitae?"
ENV REACT_APP_DEFAULT_HERO_IMAGE=/assets/_tmp/header--library.jpg
ENV REACT_APP_LOGO_URL=/assets/logo-timbuctoo.svg
ENV REACT_APP_TEXT_EN_APP_TITLE=Timbuctoo
ENV REACT_APP_TEXT_NL_APP_TITLE=Timbuctoo
ENV REACT_APP_BACKEND_URL=https://data.anansi.clariah.nl
ENV REACT_APP_LOGIN_URL=https://secure.huygens.knaw.nl/saml2/login
 
# Set the command to start the node server.
CMD sh -c 'echo "window.dynamicEnv = {REACT_APP_BACKEND_URL: '"'"'$REACT_APP_BACKEND_URL'"'"', REACT_APP_HIDE_OWN_DATASETS: '"'"'$REACT_APP_HIDE_OWN_DATASETS'"'"', REACT_APP_PRIMARY_COLOR: '"'"'$REACT_APP_PRIMARY_COLOR'"'"', REACT_APP_TEXT_EN_TITLE: '"'"'$REACT_APP_TEXT_EN_TITLE'"'"', REACT_APP_TEXT_EN_LEADER_TEXT: '"'"'$REACT_APP_TEXT_EN_LEADER_TEXT'"'"', REACT_APP_TEXT_NL_TITLE: '"'"'$REACT_APP_TEXT_NL_TITLE'"'"', REACT_APP_TEXT_NL_LEADER_TEXT: '"'"'$REACT_APP_TEXT_NL_LEADER_TEXT'"'"', REACT_APP_DEFAULT_HERO_IMAGE: '"'"'$REACT_APP_DEFAULT_HERO_IMAGE'"'"', REACT_APP_LOGO_URL: '"'"'$REACT_APP_LOGO_URL'"'"', REACT_APP_TEXT_EN_APP_TITLE: '"'"'$REACT_APP_TEXT_EN_APP_TITLE'"'"', REACT_APP_TEXT_NL_APP_TITLE: '"'"'$REACT_APP_TEXT_NL_APP_TITLE'"'"', REACT_APP_LOGIN_URL: '"'"'$REACT_APP_LOGIN_URL'"'"'};" > dynamic_env.js && serve -s -p 80'

# Tell Docker about the port we'll run on.
EXPOSE 80
