#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -b main
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:rena78/rena78.github.io.git main

# if you are deploying to https://rena78.github.io/web-speech-recognition-app/
git push -f git@github.com:rena78/web-speech-recognition-app.git main:gh-pages

cd -