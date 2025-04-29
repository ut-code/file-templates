# Nix Flake: 依存関係を統一的に管理し、バ＝ジョンを固定する。
# Nix 公式はドキュメントなんて丁寧なものを書いてくれないので、適当な Zenn の記事読み漁るか Youtube で Nix 人の動画見るかして勉強してください。
# 必須: flake.lock
# 推奨: .envrc
{
  description = "Templates"; # パッケージの説明。置き換えなくても動く

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    nixpkgs,
    flake-utils,
    ...
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = import nixpkgs {inherit system;};
    in {
      # パッケージの設定
      # `nix run github:ut-code/file-templates` などとしてやると動くのが確認できる。
      packages.default = pkgs.hello;
      # More examples:
      # - simple stdenv.mkDerivation: https://qiita.com/hnakano863/items/4abfa4475ddc4c8684b1
      # - rustPlatform.buildRustPackage: https://zenn.dev/asa1984/books/nix-hands-on/viewer/ch04-02-rust-project
      # - buildGoModule: https://nixos.org/manual/nixpkgs/stable/#sec-language-go
      # - node2nix: https://zenn.dev/pandaman64/articles/zenn-built-with-nix

      # 開発シェルの設定
      devShell = pkgs.mkShell {
        packages = with pkgs; [
          bun
          lefthook
        ];

        # 開発環境に入ったときに実行するシェルフック。
        shellHook = ''
          lefthook install
        '';
      };
    });
}
