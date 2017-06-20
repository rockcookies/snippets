---
title: DOMReady函数
---

```javascript
var DOMReady = function(a, b, c) {
  b = document
  c = 'addEventListener'
  b[c] ? b[c]('DocumentContentLoaded', a) : window.attachEvent('onload', a)
};

DOMReady(function () {
  alert('The DOM is Ready!');
});
```
