(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{699:function(t,s,a){"use strict";a.r(s);var n=a(29),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"commitlint"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#commitlint"}},[t._v("#")]),t._v(" commitlint")]),t._v(" "),a("p",[t._v("下面贴一张我们团队在一开始的时候 commit 记录，是不是有点懵。")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://apply-public-cdn.wezhuiyi.com/a186b9c9-5a9f-1577686278447.jpg",alt:"commit"}})]),t._v(" "),a("p",[t._v("下面贴一张大厂的 commit 记录，是不是一目了然很清晰。")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://apply-public-cdn.wezhuiyi.com/61738060-47ad-1577686272299.jpg",alt:"commit"}})]),t._v(" "),a("p",[t._v("那靠团队的口头约束能写出这样的 commit 记录吗，显然是不可能的，好在可以用 "),a("code",[t._v("commitlint")]),t._v(" 来规范 commit message。")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 安装依赖")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("yarn")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" @commitlint/config-conventional --save-dev\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("yarn")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" @commitlint/cli --save-dev\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("yarn")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" @commitlint/parse --save-dev\n")])])]),t._v(" "),a("p",[t._v("在 commit-msg 钩子中加入 commitlint 检查")]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"husky"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"hooks"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"commit-msg"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"commitlint -E HUSKY_GIT_PARAMS"')]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("  \n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("如果是 vue-cli 创建的项目，已经自带 "),a("code",[t._v("yorkie")]),t._v("了，配置如下")]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"gitHooks"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"commit-msg"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"commitlint -E GIT_PARAMS"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("一个好的 commit message 例子")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("type(scope?): subject\n")])])]),a("ul",[a("li",[t._v("type 类型，常用的有 feat 需求，fix 修复 bug")]),t._v(" "),a("li",[t._v("scope 本次 commit 影响的模块，比如 login , account")]),t._v(" "),a("li",[t._v("subject 主题，一段话简要描述 commit")])]),t._v(" "),a("p",[t._v("接下来自由配置 .commitlint.js 文件，生成适合团队的规范。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("module"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("extends")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@commitlint/config-conventional'")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  parserPreset"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    parserOpts"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// issue 前缀，自动识别 #1234 为 issue，可在 commit message 中写入关闭的问题 id")]),t._v("\n      issuePrefixes"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'#'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  rules"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'header-max-length'")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'always'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("100")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'type-enum'")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'always'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'feat'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// feature 新功能，新需求")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'fix'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("       "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 修复 bug")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'docs'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 仅仅修改了文档，比如README, CHANGELOG, CONTRIBUTE等等")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'style'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("     "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'refactor'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 代码重构，没有加新功能或者修复bug")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'test'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 测试用例，包括单元测试、集成测试等")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'revert'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 回滚到上一个版本")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'perf'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 性能优化")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'chore'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("     "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 改变构建流程、或者增加依赖库、工具等，包括打包和发布版本")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'conflict'")]),t._v("   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 解决合并过程中的冲突")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h2",{attrs:{id:"changelog"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#changelog"}},[t._v("#")]),t._v(" CHANGELOG")]),t._v(" "),a("p",[t._v("当 commit message 规范化后，可以用 standard-version 来自动化生成 CHANGELOG.md。")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 安装依赖")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("yarn")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" standard-version --save-dev\n")])])]),a("p",[t._v("添加脚本命令")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"scripts"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"standard"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"standard-version"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("默认情况下会把 commit 中 type 为 feat 的记录生成需求 log，fix 生成 bug 修复。")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://apply-public-cdn.wezhuiyi.com/aa21c108-8b44-1577686275596.jpg",alt:"changelog"}})]),t._v(" "),a("p",[t._v("standard-version 也提供了可配置属性，"),a("a",{attrs:{href:"https://github.com/conventional-changelog/conventional-changelog-config-spec/blob/master/versions/2.1.0/README.md",target:"_blank",rel:"noopener noreferrer"}},[t._v("conventional-changelog-config-spec"),a("OutboundLink")],1),t._v("。")]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* package.json */")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"standard-version"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"issueUrlFormat"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://xxx.com/{{id}}"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"types"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"type"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"feat"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"section"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"需求"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"type"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"fix"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"section"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Bug 修复"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"type"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"perf"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"section"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"优化"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"type"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"chore"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"hidden"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"type"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"docs"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"hidden"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"type"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"style"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"hidden"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"type"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"refactor"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"hidden"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"type"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"test"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"hidden"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"type"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"conflict"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"hidden"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"type"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"revert"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"hidden"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("commit url 默认取 package.json 中 repository.url")]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"repository"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"type"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"git"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"url"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"git+https://github.com/joyran/yi-blog.git"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n")])])]),a("p",[t._v("我的项目由于要在本地打包然后上传到服务器，所以做了自动化脚本 release.sh 一键发布。")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token shebang important"}},[t._v("#!/usr/bin/env sh")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 确保脚本抛出遇到的错误")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("set")]),t._v(" -e\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 编译")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("yarn")]),t._v(" build\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 提交编译后的文件")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" -A\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" commit -m "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"chore(build): 打包编译"')]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 生成 CHANGELOG.md，修改版本号，打上版本号的 tag")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("yarn")]),t._v(" standard\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 发布")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 提交所有 tag")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push --tags\n")])])]),a("p",[t._v("添加脚本命令，执行 "),a("code",[t._v("yarn release")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"scripts"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"release"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"bash release.sh"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("测试环境下发布不需要打 tag 和生成 CHANGELOG.md，可以在 release.sh 中判断 git 分支，比如 master 为生产发布环境，dev 为测试环境。")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token shebang important"}},[t._v("#!/usr/bin/env sh")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 确保脚本抛出遇到的错误")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("set")]),t._v(" -e\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 读取当前分支")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("branch")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("`")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" symbolic-ref --short HEAD"),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("`")])]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"'),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$branch")]),t._v('"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"master"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("then")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 编译")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("yarn")]),t._v(" build\n\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 提交编译后的文件")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" -A\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" commit -m "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"chore(build): 打包编译"')]),t._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 生成 CHANGELOG.md，修改版本号，打上版本号的 tag")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("yarn")]),t._v(" standard\n\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 发布")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push\n\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 提交所有 tag")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push --tags\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("elif")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"'),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$branch")]),t._v('"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"dev"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("then")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# dev分支不打tag，也不生成CHANGELOG.md")]),t._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 编译")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("yarn")]),t._v(" build\n\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 提交编译后的文件")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" -A\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" commit -m "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"chore(release): dev"')]),t._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 上传远程仓库")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push origin dev\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 其他分支直接退出")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("echo")]),t._v(" -e "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"'),a("span",{pre:!0,attrs:{class:"token entity",title:"\\033"}},[t._v("\\033")]),t._v("[31m 只能在 master 或者 dev 分支上执行 yarn release！ "),a("span",{pre:!0,attrs:{class:"token entity",title:"\\033"}},[t._v("\\033")]),t._v('[0m"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("fi")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);