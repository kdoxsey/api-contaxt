#!/bin/bash

API="http://localhost:4741"
URL_PATH="/contacts"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Authrization: Bearer ${TOKEN}"

  echo
