FROM oven/bun:1.2.10
WORKDIR /app
COPY bun.lock package.json ./
RUN bun install --frozen-lockfile
COPY . .
CMD bun /app/index.ts
