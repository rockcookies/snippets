---
title: placeholder文字居中
---

**让placeholder居中的兼容写法：**

```css
input::input-placeholder { text-align: center }
input::-ms-input-placeholder{text-align: center;}
input::-webkit-input-placeholder{text-align: center;}
```

如果是 textarea 也同理：`textarea::input-placeholder`，同时配合line-height，还能实现文字的垂直居中.
