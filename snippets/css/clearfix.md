---
title: 清除浮动
---

```css
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}
* html .clearfix             { zoom: 1; } /* IE6 */
*:first-child+html .clearfix { zoom: 1; } /* IE7 */
```

```css
.clearfix {
  *zoom:1;
}

.clearfix:after{
  display:table;
  content:'';
  clear:both;
}
```
