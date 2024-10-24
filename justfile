# Just: Just a command runner
# GitHub: https://github.com/casey/just
# 必須: just (executable)
# 関連: GNU Make / Makefile (ほぼ同機能)
default: watch

# Setup
setup: setup-root setup-sample
setup-root:
    lefthook install # bunx husky # ... choose one

# Watch
watch:
    trap 'kill 0' EXIT; \
        just watch-sample & \
        wait

# Build All
build: build-sample

# Test
test: test-sample

# Sample-Program
setup-sample:
    cd sample-program; bun install --frozen-lockfile
watch-sample:
    cd sample-program; bun watch
# setup-sample is required for deploy, and better for development (to prevent dependency desync)
build-sample: setup-sample
    cd sample-program; bun run build
serve-sample:
    cd sample-program; bun target/main.js
test-sample:
    cd sample-program; bun test:all
