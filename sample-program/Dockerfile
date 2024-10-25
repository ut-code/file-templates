# Docker, a virtulization layer.
# doc: https://docs.docker.jp/
# 必須: Docker (program)
# 推奨: compose.yaml

# TIP: latest is discouraged. change `latest` to the latest locked version of the image (example: `oven/bun:1.1.33`)
FROM oven/bun:latest
WORKDIR /sample-program
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY . ./
RUN bun run build
CMD ["bun", "./target/main.js"]
