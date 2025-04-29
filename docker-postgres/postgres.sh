#!/usr/bin/env bash

# Postgres on Docker
# doc: https://hub.docker.com/_/postgres

# アプリケーションサーバーを Docker で立てている場合、セキュリティ上の理由でホスト OS の他のポートにアクセスできないため、
# この Postgres のコンテナはアプリケーションサーバーをホスト OS で実行している場合のみ使える。
# doc: (昔見つけた記憶はあるが、探しても見つからなかったのでそれっぽい記述のものがあったら貼ってください)

# to use this, change .env:DATABASE_URL to
# DATABASE_URL=postgres://user:password@localhost:5432/database

# to kill this database, run `docker stop postgres` (for graceful shutdown) or `docker kill postgres` (for force kill)
docker run --rm -d --name postgres -p 5432:5432 \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_USER=user \
  -e POSTGRES_DB=database \
  postgres:latest

until docker exec postgres pg_isready -h localhost -U user -d database; do
  sleep 1
done
