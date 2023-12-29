#!/usr/bin/env sh

# 发生错误时终止
set -e

# 构建
yarn build:github

# 进入构建文件夹
cd dist

# 放置 .nojekyll 以绕过 Jekyll 的处理。
echo > .nojekyll

git init
git checkout -B gh-pages
git add . -f
git commit -m 'deploy'

git push -f git@github.com:mj921/dysonsphereprogramtool.git gh-pages

cd -