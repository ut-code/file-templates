注: この README はサンプルの README です。このリポジトリ自体の README は、 [self.README.md](self.README.md) を参照してください。

<!-- このファイルは好きなように編集してください。以下に一例を示します。 -->

# Project: Template

各プロジェクトにファイルのテンプレートを提供するプロジェクトです。

## 使い方

ファイルをコピーし、ファイルに書いてあるように編集します。

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
