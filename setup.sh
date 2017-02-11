#!/bin/bash

BASE=$(cd $(dirname $0) && pwd)
cd ${BASE}

SCRIPT_DIR="${HOME}/Library/Application Support/iTerm/Scripts"
[[ -d "${SCRIPT_DIR}" ]] || mkdir -p "${SCRIPT_DIR}"

for i in $(ls -1 *.js); do
  SRC=$(basename ${i%.js})
  osacompile -l JavaScript -o ./${SRC}.scpt ./${SRC}.js
  ln -fs "${BASE}/${SRC}.scpt" "${SCRIPT_DIR}/${SRC}.scpt"
done
