#!/bin/bash

API="http://localhost:4741"
URL_PATH="/change-username"

curl "${API}${URL_PATH}/" \
  --include \
  --request PATCH \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "usernames": {
      "old": "'"${OLDUN}"'",
      "new": "'"${NEWUN}"'"
    }
  }'

echo
