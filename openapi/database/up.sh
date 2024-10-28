#!/usr/bin/env bash

cd `dirname -- $0`;

./launch.sh

psql -f ./seed.sql postgres://user:password@localhost:5432/database
