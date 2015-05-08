#!/usr/bin/env bash

cd /tmp

rm -rf Circadian-Hormones; true

git clone https://github.com/tliber/Circadian-Hormones.git

cd Circadian-Hormones

npm install --unsafe-perm

nodejs server.js 