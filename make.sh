#!/bin/bash

BASE=$(cd $(dirname $0) && pwd)
cd ${BASE}

for js in $(ls -1 src/*.js); do
  SRC=$(basename ${js})
  osacompile -l JavaScript -o ./scripts/${SRC%.js}.scpt ./src/${SRC}
done
