<template>
	<div id="app">
		<div class="site-header">
			<div class="site-container">
				<div class="header-nav">
					<ul class="nav-right">
						<li><a :href="ctx + '/'">Home</a></li>
						<li><a :href="ctx + '/blog'">Blog</a></li>
						<li><a :href="ctx + '/blog/about/'">About</a></li>
					</ul>
				</div>
				<h1 class="site-title">Snippets</h1>
				<p class="site-desc">曲奇的代码库</p>
			</div>
		</div>
		<div class="main-wrapper fn-clear">
			<snippets />
		</div>
	</div>
</template>

<script>
import Snippets from './Snippets.vue';

export default {
	name: 'app',
	components: { Snippets },
	data() {
		return {
			ctx: '..'
		};
	}
};
</script>

<style lang="less">
@import "snippets/styles/layouts.less";
</style>
