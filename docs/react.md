---
title: React 简介
date: 2019-10-25
---

**用于构建用户界面的 JavaScript 库**

### 简单组件
React 组件使用一个名为 render() 的方法，接收输入的数据并返回需要展示的内容。在示例中这种类似 XML 的写法被称为 JSX。被传入的数据可在组件通过 this.props 在 render() 访问。

**使用 React 的时候也可以不使用 JSX 语法**。尝试使用 Babel REPL，了解 JSX 被编译成原生 JavaScript 代码的步骤。

<!---more--->

```js
class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        Hello {this.props.name}
      </div>
    );
  }
}

ReactDOM.render(
  <HelloMessage name="Taylor" />,
  document.getElementById('hello-example')
);
```
