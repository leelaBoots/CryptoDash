# I had to find a version that matched my node version of 18.18.0
FROM node:18.18-alpine3.17

# I added this to the example i found
WORKDIR /app

# Override the base log level (info).
ENV NPM_CONFIG_LOGLEVEL warn

# Install and configure `serve`. (I added -n for ignore engines, to avoid an
# error when building running the docker image
RUN yarn global add serve
CMD serve -s -n build
EXPOSE 8080

# Install all dependencies of the current project.
COPY package.json package.json
RUN yarn

# Copy all local files into the image.
COPY . .

# Build for production. I added --ignore-engines to avoid an error 
RUN yarn run build --ignore-engines