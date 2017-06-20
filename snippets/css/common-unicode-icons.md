---
title: Unicode icon
---

**演示：**

<div class="unicode-demo">
	<p><a href="mailto:hqy321@gmail.com">hqy321@gmail.com</a></p>

	<p class="phone">555-555-5555</p>

	<p class="important">REMEMBER: drink slushies too fast.</p>

	<blockquote>Designers tend to whisper, ad agencies tend to shout.</blockquote>

	<p class="alert">Stranger Danger!<p>
</div>

<style>
.unicode-demo a[href^="mailto:"]:before { content: "\2709"; }
.unicode-demo .phone:before             { content: "\2706"; }
.unicode-demo .important:before         { content: "\27BD"; }
.unicode-demo blockquote:before         { content: "\275D"; }
.unicode-demo blockquote:after          { content: "\275E"; }
.unicode-demo .alert:before             { content: "\26A0"; }
</style>

```css
a[href^="mailto:"]:before { content: "\2709"; }
.phone:before             { content: "\2706"; }
.important:before         { content: "\27BD"; }
blockquote:before         { content: "\275D"; }
blockquote:after          { content: "\275E"; }
.alert:before             { content: "\26A0"; }
```
