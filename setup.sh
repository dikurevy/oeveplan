#!/bin/sh

URL=$1

echo "var data = [`curl -s $URL`]" > revue.data.json.js
echo "Revue data has now been downloaded... have fun!"
