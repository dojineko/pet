#!/bin/bash

BASEDIR=$(cd $(dirname $0) && pwd)
cd ${BASEDIR}

SCRIPT_DIR="${HOME}/Library/Application Support/iTerm/Scripts"
[[ -d "${SCRIPT_DIR}" ]] || mkdir -p "${SCRIPT_DIR}"

for i in $(ls -1 *.js); do
  SRC=$(basename ${i%.js})
  DEST="${SCRIPT_DIR}/${SRC}.scpt"
  [[ -e "${DEST}" ]] && /bin/rm -f "${DEST}"
  osacompile -l JavaScript -o "${DEST}" "./${i}"
done
