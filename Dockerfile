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

ENV NEXT_PUBLIC_API_URL=https://qazalem.ziz.kz/api/v1/
ENV NEXT_PUBLIC_YOUTUBE=UCef62ITFdIiXn3oXc_0BCLg
ENV NEXT_PUBLIC_API_GOOGLE=AIzaSyB6ZUos11000PDzfqJ0dRWnWclueCBMNzQ
ENV NEXTAUTH_SECRET=00857cbb0e13043bb5b2a53814e0bb9e
ENV NEXTAUTH_URL=https://qazalem.kz
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LfKQOkoAAAAAFGIzevlD_lFdsTPXeTEdsqjLZnk
ENV RECAPTCHA_SECRET_KEY=6LfKQOkoAAAAAOmdbYtXScsQsH32khCFGQ0wmMRf
COPY --from=builder /qazalem/public ./public
COPY --from=builder /qazalem/package.json ./package.json
COPY --from=builder /qazalem/.next ./.next
COPY --from=builder /qazalem/next.config.js ./next.config.js
COPY --from=builder /qazalem/node_modules ./node_modules

EXPOSE 3000
CMD ["yarn", "start"]