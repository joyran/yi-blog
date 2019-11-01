---
title: 根据 git commit 自动生成 CHANGELOG.md
date: 2019-12-17
---

## commitlint

下面贴一张我们团队在一开始的时候 commit 记录，是不是有点懵。

![xx](/commit.jpg)

下面贴一张大厂的 commit 记录，是不是一目了然很清晰。

![xx](/angular-commit.jpg)

那靠团队的口头约束能写出这样的 commit 记录吗，显然是不可能的，好在可以用`commitlint`来规范 commit message。

```bash
# 安装依赖
yarn add @commitlint/config-conventional --save-dev
yarn add @commitlint/cli --save-dev
yarn add @commitlint/parse --save-dev
```

<!-- more -->

在 commit-msg 钩子中加入 commitlint 检查

```json
{
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }  
  }
}
```

如果是 vue-cli 创建的项目，已经自带 `yorkie`了，配置如下

```json
"gitHooks": {
  "commit-msg": "commitlint -E GIT_PARAMS"
}
```

一个好的 commit message 例子

```
type(scope?): subject
```

- type 类型，常用的有 feat 需求，fix 修复 bug
- scope 本次 commit 影响的模块，比如 login , account
- subject 主题，一段话简要描述 commit

接下来自由配置 .commitlint.js 文件，生成适合团队的规范。

```js
module.exports = {
  extends: [
    '@commitlint/config-conventional'
  ],
  parserPreset: {
    parserOpts: {
      // issue 前缀，自动识别 #1234 为 issue，可在 commit message 中写入关闭的问题 id
      issuePrefixes: ['#']
    }
  },
  rules: {
    'header-max-length': [0, 'always', 100],
    'type-enum': [
      2,
      'always',
      [
        'feat',      // feature 新功能，新需求
        'fix',       // 修复 bug
        'docs',      // 仅仅修改了文档，比如README, CHANGELOG, CONTRIBUTE等等
        'style',     // 仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑
        'refactor',  // 代码重构，没有加新功能或者修复bug
        'test',      // 测试用例，包括单元测试、集成测试等
        'revert',    // 回滚到上一个版本
        'perf',      // 性能优化
        'chore',     // 改变构建流程、或者增加依赖库、工具等，包括打包和发布版本
        'conflict'   // 解决合并过程中的冲突
      ]
    ]
  }
}
```

## CHANGELOG

当 commit message 规范化后，可以用 standard-version 来自动化生成 CHANGELOG.md。

```bash
# 安装依赖
yarn add standard-version --save-dev
```

添加脚本命令

```js
"scripts": {
  "standard": "standard-version",
}
```

默认情况下会把 commit 中 type 为 feat 的记录生成需求 log，fix 生成 bug 修复。

![xx](/changelog.jpg)

standard-version 也提供了可配置属性，[conventional-changelog-config-spec](https://github.com/conventional-changelog/conventional-changelog-config-spec/blob/master/versions/2.1.0/README.md)。

```json
/* package.json */
"standard-version": {
  "issueUrlFormat": "https://xxx.com/{{id}}",
  "types": [
    { "type": "feat", "section": "需求" },
    { "type": "fix", "section": "Bug 修复" },
    { "type": "perf", "section": "优化" },
    { "type": "chore", "hidden": true },
    { "type": "docs", "hidden": true },
    { "type": "style", "hidden": true },
    { "type": "refactor", "hidden": true} ,
    { "type": "test", "hidden": true },
    { "type": "conflict", "hidden": true },
    { "type": "revert", "hidden": true }
  ]
}
```

commit url 默认取 package.json 中 repository.url

```json
"repository": {
  "type": "git",
  "url": "git+https://github.com/joyran/yi-blog.git"
},
```

我的项目由于要在本地打包然后上传到服务器，所以做了自动化脚本 release.sh 一键发布。

```bash
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 编译
yarn build

# 提交编译后的文件
git add -A
git commit -m "chore(build): 打包编译"

# 生成 CHANGELOG.md，修改版本号，打上版本号的 tag
yarn standard

# 发布
git push

# 提交所有 tag
git push --tags
```

添加脚本命令，执行 `yarn release`

```js
"scripts": {
  "release": "bash release.sh"
}
```
