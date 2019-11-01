---
title: Git hooks + Eslint + Stylelint + Prettier 规范代码
date: 2019-11-24
---

开发过程中为了统一团队编码规范，会用 Eslint 去检查和自动修复 js 代码。即使代码规范检查不通过，还是可以提交 commit 记录，
还好 git hook 提供了很多钩子函数绑定在 git 各个命令上，这样就可以把 eslint 代码检查放在 pre-commit hook 中，
eslint 检查不通过就不让提交了。

<!-- more -->

## Git hooks

默认情况下项目中 .git/hooks 中已经内置了很多 hook，比如 pre-commit.sample，.simple 结尾的 hook 只是个例子不生效的，
去掉文件后缀 .simple 就生效了，但还是要改一些内容，好在 husky 可以为我们做这些事。

```bash
npm install husky --save-dev
```

在 package.json 中添加配置，此时 commit 之前就会执行 eslint --fix 了，如果 eslint 检查失败则阻止 commit.

```json
"husky": {
  "hooks": {
    "pre-commit": "eslint --fix"
  }
}
```

如果使用 vue-cli 创建的项目，则已经自动安装了 `yorkie`，是尤大 fork husky 并做了优化的替代方案，
和 husky 配置有点区别，在 package.json 中添加如下配置。

```json
"gitHooks": {
  "pre-commit": "eslint --fix"
}
```

到这一步 git commit 前已经在做 eslint 检查了，但每次修改了一个文件也会检查所有项目文件，`lint-staged`提供了
一种方案只检查每次变更的内容。

```bash
npm install lint-staged --save-dev
```

在 package.json 中添加配置，或者新增一个单独的配置文件 .lintstagedrc。`src/**/*.{js,vue}`限定了只检查 src 目录下的
所有 js 和 vue 文件，因为 eslint --fix 会自动修复一些小的问题，修复完成后自动 git add 不需要手动 add 了。

```json
"lint-staged": {
  "src/**/*.{js,vue}": [
    "eslint --fix",
    "git add"
  ]
}
```

## Stylelint

js 和 vue 文件可以使用 eslint 校验，css 我们采用 stylelint 校验。

```bash
npm install stylelint --save-dev
```

在 package.json scripts 添加一条命令 `"stylelint": "stylelint src/**/*.{less,vue} --fix"`，
也可以把校验放到 lint-staged 中。

```json
"lint-staged": {
  "src/**/*.{js,vue}": [
    "eslint --fix",
    "git add"
  ],
  "src/**/*.{less,vue}": [
    "stylelint --fix",
    "git add"
  ]
}
```

stylelint 提供了很多 [rules](https://stylelint.io/user-guide/rules)，
可以在 package.json 中增加一个 stylelint 属性配置规则，也可以添加一个 `.stylelintrc.json` 文件配置规则，
规则很多时建议用一个单独文件配置，关闭某个规则用 null 即可。

```json
// stylelintrc.json
{
  "extends": "stylelint-config-standard",
  "plugins": [
    "stylelint-order"
  ],
  "rules": {
    "color-hex-length": "long",
    "color-hex-case": "upper",
    "comment-empty-line-before": [
      "always",
      {
        "ignore": [
          "stylelint-commands"
        ],
        "except": [
          "first-nested"
        ]
      }
    ],
    "selector-max-empty-lines": 1,
    "no-descending-specificity": null,
    "font-family-no-missing-generic-family-keyword": null,
    "value-list-comma-space-after": "always-single-line",
    "max-line-length": 80
  }
}
```

## Prettier

eslint 虽然能检查大部分代码不规范的地方，但有两个地方却无能为力。
1. 不能针对格式美化
2. 不能美化 vue 中模板代码

```bash
yarn add prettier --save-dev
```

prettier 前

```js
export const requestDomain = prod ? 'https://api.production.github.com' : 'https://api.develop.github.com'
```

```html
<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
```

prettier 后

```js
export const requestDomain = prod
  ? 'https://api.production.github.com'
  : 'https://api.develop.github.com'
```

```html
<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose"
>
```

在 package.json scripts 新增一条命令 `"prettier": "prettier src/**/*.{js,vue} --write"`
或者在`lint-staged`中添加配置只针对修改的文件。

```json
"lint-staged": {
  "src/**/*.{js,vue}": [
    "prettier --write",
    "eslint --fix",
    "git add"
  ],
  "src/**/*.{less,vue}": [
    "stylelint --fix",
    "git add"
  ]
}
```

prettier 提供了一些简单的[配置选项](https://prettier.io/docs/en/options.html)，配置文件支持以下四种。
- "prettier" key in your package.json file.
- .prettierrc file, written in JSON or YAML, with optional extensions: .json/.yaml/.yml (without extension takes precedence).
- .prettierrc.js or prettier.config.js file that exports an object.
- .prettierrc.toml file, written in TOML (the .toml extension is required).

::: tip 提示
prettier 提供的可配置规则比较少，里面的规则和 eslint、stylelint 规则会有冲突。
可以在 eslint 前执行 `prettier --write`
:::
