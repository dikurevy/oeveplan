#!/bin/sh

URL=$1

echo "var data = `curl -s $URL`" > json.js
echo "Revue data has now been downloaded... have fun!"
