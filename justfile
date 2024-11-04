# Just: Just a command runner
# GitHub: https://github.com/casey/just
# 必須: just (executable)
# 関連: GNU Make / Makefile (ほぼ同機能)
default: watch

# Setup
setup: setup-root setup-basic
setup-root:
    lefthook install

# Watch
watch:
    trap 'kill 0' EXIT; \
        just watch-basic & \
        wait

# Build All
build: build-basic

# Test
test: test-basic

# Basic-Program
setup-basic:
    cd basic-program; bun install --frozen-lockfile
watch-basic:
    cd basic-program; bun watch
# setup-basic is required for deploy, and better for development (to prevent dependency desync)
build-basic: setup-basic
    cd basic-program; bun run build
serve-basic:
    cd basic-program; bun target/main.js
test-basic:
    cd basic-program; bun test:all
