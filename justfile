# Just: Just a command runner
# GitHub: https://github.com/casey/just
# 必須: just (exec)
# 関連: GNU Make / Makefile (同機能)
default: watch

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
watch-sample:
    cd sample-program; bun watch
build-sample:
    cd sample-program; bun run build
exec-sample:
    cd sample-program; bun target/main.js
test-sample:
    cd sample-program; bun test:all
