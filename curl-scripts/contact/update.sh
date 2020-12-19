#!/bin/bash

API="http://localhost:4741"
URL_PATH="/contacts"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "contact": {
      "firstName": "'"${FIRSTNAME}"'",
      "lastName": "'"${LASTNAME}"'",
      "latitude": "'"${LATITUDE}"'",
      "longitude": "'"${LONGITUDE}"'"
    }
  }'
  
echo
