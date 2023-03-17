ARG node_version
FROM node:${node_version}-alpine

# Create app directory
RUN mkdir -p /app

WORKDIR /app

# Bundle app source
COPY . /app

RUN apk add --update git openssh-client python make g++

RUN mkdir -p -m 0600 ~/.ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts

#ADD ssh-config /root/.ssh/config
#ADD id_rsa  /root/.ssh/id_rsa

RUN chmod -R 600 ~/.ssh && ls ~/.ssh

# Install app dependencies
RUN npm install

# Build dist dir (we will pass later on an env variable to control this)
RUN npm run prestart:prod

# inject the build version number from the ci
ARG VERSION
ENV VERSION ${VERSION}


# run the app in production !
ENTRYPOINT []
CMD [ "node", "dist/main.js" ]


EXPOSE 3000