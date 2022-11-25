## Base ########################################################################
# Use a larger node image to do the build for native deps (e.g., gcc, python)
FROM node:lts as deps
# WORKDIR /app
# Reduce npm log spam and colour during install within Docker
ENV NPM_CONFIG_LOGLEVEL=error
ENV NPM_CONFIG_COLOR=false

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM deps as builder
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

COPY --chown=nodejs:nodejs . .

# Build the Docusaurus app
RUN yarn build
USER nodejs
EXPOSE 8080

ENV PORT 8080

CMD ["npm", "start"]
