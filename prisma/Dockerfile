# prisma は nodejs に依存するため、 nodejs のある image を使う
# https://github.com/prisma/prisma/issues/24678
FROM node:latest
RUN npm install -g bun
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY . .
RUN bunx prisma generate
CMD bunx prisma db push && bunx prisma studio
