注: この README はサンプルの README です。このリポジトリ自体の README は、 [self.README.md](self.README.md) を参照してください。

<!-- このファイルは好きなように編集してください。以下に一例を示します。 -->

# Project: Template

各プロジェクトにファイルのテンプレートを提供するプロジェクトです。

## 使い方

ファイルをコピーし、ファイルに書いてあるように編集します。

## 技術スタック

- Frontend
  - None

- Backend
  - JavaScript
    - Bun ([Website](https://bun.sh/))
    - Hono ([Website](https://hono.dev/))
    - Prisma ([Website](https://www.prisma.io/))
  - Rust
    - Cargo
    - Poem ([GitHub](https://github.com/poem-web/poem))
    - SQLx ([GitHub](https://github.com/launchbadge/sqlx))

- Database
  - Postgres ([Website](https://www.postgresql.org/)) on Docker

- Infrastructure
  - Nix Flake
    - Flake Utils ([GitHub](https://github.com/numtide/flake-utils))
    - Fenix ([GitHub](https://github.com/nix-community/fenix))
    - Prisma Utils ([GitHub](https://github.com/VanCoding/nix-prisma-utils))
  - Docker ([Website](https://www.docker.com/ja-jp/))
    - Docker Compose ([Website](https://docs.docker.com/compose/))

- Development
  - API Doc: OpenAPI
  - Task Runner: Just ([GitHub](https://github.com/casey/just))
  - Precommit: Lefthook ([GitHub](https://github.com/evilmartians/lefthook))
  - Formatter / Linter: Biome ([Website](https://biomejs.dev/ja/))
  - Watcher: cargo-watch ([GitHub](https://github.com/watchexec/cargo-watch))
  - Watcher: Bun `bun --watch`
  
## 開発

### 環境構築

1. Nix を使う方法

- Nix と direnv をインストールします。
- このディレクトリで、 `direnv allow` を実行します。
- Docker をインストールします。

2. それ以外

- 以下のパッケージをインストールしてください。

  - Bun
  - Biome
  - Just
  - lefthook
  - Docker

- 以下のコマンドを実行してください。
  - `lefthook install`

### 開発環境で実行 (watch モード)

```sh
just watch
```

### デプロイ方法

basic program:

```sh
# Setup Command
just build-basic
# Serve Command
just serve-basic
```
