# Monorepo Example

重要なところ

- ルートの `package.json`: `workspaces` に各パッケージのある**ディレクトリ**が指定されている
- 各パッケージの `package.json`: `dependencies` に、
    "依存するパッケージのパッケージ名": "workspace:パッケージのあるディレクトリ"
  とある

- 各パッケージのディレクトリに`node_modules`がない (追記: たまに出現するらしい)
- 各パッケージのディレクトリにロックファイル (`bun.lock`) がない
