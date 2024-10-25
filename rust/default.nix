{ system, fenix }:
fenix.packages.${system}.fromToolchainFile {
  file = ./rust-toolchain.toml;
  # just copy the hash for now and nix will tell you the right hash
  sha256 = "sha256-yMuSb5eQPO/bHv+Bcf/US8LVMbf/G/0MSfiPwBhiPpk=";
}
