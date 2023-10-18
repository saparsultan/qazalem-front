FROM node:18.15.0 as dependencies
WORKDIR /qazalem
COPY package.json yarn.lock ./
RUN yarn install --production

FROM node:18.15.0 as builder
WORKDIR /qazalem
COPY . .
COPY --from=dependencies /qazalem/node_modules ./node_modules
RUN yarn build

FROM node:18.15.0 as runner
WORKDIR /qazalem


COPY --from=builder /qazalem/public ./public
COPY --from=builder /qazalem/package.json ./package.json
COPY --from=builder /qazalem/.next ./.next
COPY --from=builder /qazalem/next.config.js ./next.config.js
COPY --from=builder /qazalem/node_modules ./node_modules

EXPOSE 3000
CMD ["yarn", "start"]