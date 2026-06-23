#!/bin/bash
if [ "$1" == "dev" ]; then
  echo -n "dev-" > ../src/VERSION.txt
  date "+%Y%m%d.%H%M%S" >> ../src/VERSION.txt
else
  echo $1 > ../src/VERSION.txt
fi

cd ../
npx webpack