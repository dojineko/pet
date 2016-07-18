#!/bin/bash

BASE=$(cd $(dirname $0) && pwd)
cd ${BASE}

SCRIPT_DIR="${HOME}/Library/Application Support/iTerm/Scripts"
[ -d "${SCRIPT_DIR}" ] || mkdir -p "${SCRIPT_DIR}"

for scpt in $(ls -1 scripts/*.scpt); do
  ln -fs "${BASE}/${scpt}" "${SCRIPT_DIR}/${scpt##*/}"
done
