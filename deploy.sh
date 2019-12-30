#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
# 由于编译后没有退出运行环境导致下一步执行不了，暂时手动执行
# yarn run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git add -A
git commit -m "deploy"

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:joyran/yi-blog.git master:gh-pages

cd -
