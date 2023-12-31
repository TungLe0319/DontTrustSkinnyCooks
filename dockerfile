FROM node:lts as base
WORKDIR /usr/src/app
RUN npm i -g pnpm

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json pnpm-lock.yaml /temp/dev/
RUN cd /temp/dev && pnpm install

# # install with --production (exclude devDependencies)
# RUN mkdir -p /temp/prod
# COPY package.json bun.lockb /temp/prod/
# RUN cd /temp/prod && bun install --frozen-lockfile

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM install AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# [optional] tests & build
ENV NODE_ENV=production
# RUN bun test
RUN pnpm run generate:prisma
RUN pnpm run build

# copy production dependencies and source code into final image
FROM node:lts-alpine AS release
# nuxt packages everything it needs in its .output directory when building
# COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/.output/ ./.output/
# COPY --from=prerelease /usr/src/app/data/ ./data/
# run the app
EXPOSE 3000/tcp
CMD ["sh", "-c", "node .output/server/index.mjs"]
