---
title: 保持比例的图片
---

**演示：**

<div style="margin:0 auto;width: 50%;">
  <div class="img-box">
    <img src="https://placehold.it/800x600" class="img">
  </div>
</div>

<style>
.img-box {
  width: 100%;
  position: relative;
}

.img-box:before {
  content: "";
  display: block;
  width: 100%;
  padding-top: 75%;
}

.img-box > .img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

```css
.img-box {
  width: 100%;
  position: relative;
}

.img-box:before {
  content: "";
  display: block;
  width: 100%;
  padding-top: 75s%;
}

.img-box > .img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```
