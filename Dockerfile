FROM ubuntu:15.10

# enable add-apt-repository
RUN apt-get update 
RUN apt-get dist-upgrade -y
RUN apt-get install -y python-software-properties
RUN apt-get install -y software-properties-common

# Install Java.
RUN add-apt-repository ppa:webupd8team/java
RUN apt-get update 

RUN echo debconf shared/accepted-oracle-license-v1-1 select true | debconf-set-selections
RUN echo debconf shared/accepted-oracle-license-v1-1 seen true | debconf-set-selections
RUN apt-get install -y oracle-java8-installer
RUN apt-get install oracle-java8-set-default

RUN apt-get install -y git
RUN apt-get install -y curl

ENV MAVEN_VERSION 3.3.9

RUN curl -fsSL https://archive.apache.org/dist/maven/maven-3/$MAVEN_VERSION/binaries/apache-maven-$MAVEN_VERSION-bin.tar.gz | tar xzf - -C /usr/share \
  && mv /usr/share/apache-maven-$MAVEN_VERSION /usr/share/maven \
  && ln -s /usr/share/maven/bin/mvn /usr/bin/mvn

ENV MAVEN_HOME /usr/share/maven


# gpg keys listed at https://github.com/nodejs/node
RUN set -ex \
  && for key in \
    9554F04D7259F04124DE6B476D5A82AC7E37093B \
    94AE36675C464D64BAFA68DD7434390BDBE9B9C5 \
    0034A06D9D9B0064CE8ADF6BF1747F4AD2306D93 \
    FD3A5288F042B6850C66B31F09FE44734EB7990E \
    71DCFD284A79C3B38668286BC97EC7A07EDE3FC1 \
    DD8F2338BAE7501E3DD5AC78C273792F7D83545D \
    B9AE9905FFD7803F25714661B63B535A4C206CA9 \
    C4F0DFFF4E8C1A8236409D08E73BC641CC11F4C8 \
  ; do \
    gpg --keyserver ha.pool.sks-keyservers.net --recv-keys "$key"; \
  done

ENV NPM_CONFIG_LOGLEVEL info
ENV NODE_VERSION 5.8.0

RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz" \
  && curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
  && gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc \
  && grep " node-v$NODE_VERSION-linux-x64.tar.xz\$" SHASUMS256.txt | sha256sum -c - \
  && tar -xJf "node-v$NODE_VERSION-linux-x64.tar.xz" -C /usr/local --strip-components=1 \
  && rm "node-v$NODE_VERSION-linux-x64.tar.xz" SHASUMS256.txt.asc SHASUMS256.txt

RUN mkdir -p /opt/data
COPY ./prod_backup_migrated /opt/data/prod_backup_migrated

RUN git clone https://github.com/HuygensING/timbuctoo.git
WORKDIR /timbuctoo
RUN git checkout 8a40446b6ba44c11e77aae3948b0f05bb7e8f901
RUN mvn clean package -Dmaven.test.skip=true || true


WORKDIR /

RUN git clone https://github.com/HuygensING/timbuctoo-edit-client.git
WORKDIR /timbuctoo-edit-client
RUN git checkout tags/v0.6.0

RUN pwd

RUN npm i

RUN mkdir -p build/development/js
RUN mkdir -p build/development/css

RUN ./node_modules/.bin/browserify \
	--require classnames \
	--require react \
	--require react-dnd \
	--require react-dnd-touch-backend \
	--require react-dom > build/development/js/react-libs.js

RUN ./node_modules/.bin/browserify src/query-index.js \
	--external classnames \
	--external react \
	--external react-dom \
	--external react-dnd \
	--external react-dnd-touch-backend \
	--standalone TimbuctooEdit \
	--transform [ babelify ] \
	--verbose > build/development/js/index.js

RUN ./node_modules/.bin/stylus \
	--use nib \
	--compress \
	--out build/development/css/index.css \
	src/stylus/index.styl

RUN cp src/index.html build/development/index.html

EXPOSE 3000
EXPOSE 5000

CMD cd /timbuctoo/timbuctoo-instancev4 && ./target/appassembler/bin/timbuctoo server /opt/data/prod_backup_migrated/production_config.yaml & cd /timbuctoo-edit-client && node ./scripts/server.js