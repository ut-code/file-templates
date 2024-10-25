{ prisma-utils, pkgs }:
let
  # https://github.com/VanCoding/nix-prisma-utils
  # MEMO: 現在は bun.lockb や yarn.lock はサポートしていない。 package-lock.json (npm) と pnpm-lock (pnpm) のみ。
  prisma = (prisma-utils.lib.prisma-factory {
    nixpkgs = pkgs;
    # just copy these hashes for now, and then change them when nix complains about the mismatch
    prisma-fmt-hash = "sha256-CyZzjiqup94khOGtZ0lIDGjY5v8cJqdWJkQb7ybg9As=";
    query-engine-hash = "sha256-kB5jMJRb1ptNovl5A3IdSA1u56RdQq6xvrystYc/tN8=";
    libquery-engine-hash = "sha256-PS9LHNj1WGh4WQO3FQWpX2tuUydLvfhrNJbO1WV4s6s=";
    schema-engine-hash = "sha256-zi6YFnbK4pLcQxd8OAVRI41ycNjRfZD6LTf8gTJruyU=";
  }).fromNpmLock
    ./path-to/package-lock.json; # <-- path to our package-lock.json file that contains the version of prisma-engines
in
{
  shellHook = if pkgs.system == "x86_64-linux" then prisma.shellHook else "";
}
