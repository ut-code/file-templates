FROM rust:1.82.0 AS builder
WORKDIR /builder/rust-app
COPY Cargo.toml Cargo.lock ./
COPY src ./src
RUN mkdir /share
# ./target を cache している。
# read https://zenn.dev/kou64yama/articles/powerful-docker-build-cache
RUN --mount=type=cache,target=./target cargo build --release && cp ./target/release/rust-app /share/rust-app

FROM gcr.io/distroless/cc-debian12 AS runner
# FROM ubuntu:latest AS runner
# FROM alpine:latest AS runner
# ^ choose one you like. ubuntu is huge (~70MB), distroless/cc-debian are smaller (~20MB), alpine is the smallest (~7MB) but can't run this app
WORKDIR /runner
COPY --from=builder /share/rust-app ./rust-app
CMD ["./rust-app"]
