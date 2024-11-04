# テンプレート集

## このテンプレートについて

同じようなファイルを何回も調べて書くのに疲れましたか？自分もです。

このテンプレート集は、長々しい公式ドキュメントを読まずに、かんたんな設定ファイルをコピペで作成することを目的に作られています。

## 注意

- すべてが書いてあるわけではありません。高度な設定が必要なら、公式ドキュメントを読みましょう。

## 目標

- 独立性
  各ファイルは、必要でない限り他のファイルに依存するべきではない。
  もし依存が必要な場合は、ファイル先頭にそれを明記する。

- 最小限
  各ファイルは、テンプレートとして機能する必要最小限のサイズであることが好ましい。

## テンプレートリポジトリ

このリポジトリは、テンプレートリポジトリとして利用可能です。

## ファイル名について

`self.` で始まるものは、このリポジトリ自身のためのものです。

- 例: `self.README.md` はテンプレートとしての使用を意図していません

それ以外は、テンプレートとしてコピペの後以下に書かれているように修正して使えます。

## ファイル先頭のコメント

ファイル先頭のコメントには、以下のことを書きます。
一部コメントを許可しないファイル形式 (JSON など) があるので、その場合はコメントを消去してください。

- ファイルの簡単な説明
- ドキュメントへの URL (存在する場合)
- テンプレートのコピー元 (どこかからコピーしてきた場合)
- 必要なパッケージ (例: `biome.json` -> `必要: Biome`)
- 必要なファイル (例: `package-lock.json` -> `必要: package.json`)
- 推奨するパッケージ (例: `package.json` -> `推奨: nvm`)

## 編集が必要なもの

すべてのファイルがすべてのリポジトリにコピペで適応するわけではありません。

一部のファイルは、リポジトリごとにコピー時に編集が必要です。
編集が必要な場所には、以下の HTML 風の注意書きがあります。それにしたがって編集してください。

<template
replace | optional | repeat // `replace` はそのまま置き換えるもの、 `optional` は必須ではないもの、 `repeat` は複数個指定できるもの
example: string // 例。だいたいカンマ区切り。
desc?: string // 説明。自明でない場合。
/>

## 例

```yml name=".github/workflows/ci.yml"
# GitHub Actions を用いた CI
# docs: https://docs.github.com/ja/actions/about-github-actions/about-continuous-integration-with-github-actions
on:
  - pull_request: # <template optional /> -> この行は必須ではない。
  - push: # <template optional />
      - branches:
          # <template repeat example="- main,- release" desc="プッシュしたときにCIを実行したいブランチ" />
          - master
jobs:
  # <template repeat example="format:..." desc="実行したい CI" />
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      # <template repeat example="- uses: actions/setup-node@v4, - run: npm run build" desc="各ステップで使うもの/実行するコマンド"/>
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      - run: bun install --frozen-lockfile
      - run: bun run build
```

## Contribution / Issue

are Welcome.
