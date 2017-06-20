<template>
	<div id="app">
		<img src="../assets/logo.png">
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'app',
};
</script>

<style lang="less">
@import "common/styles/vendor.less";

#app {
	text-align: center;
	margin-top: 60px;
}
</style>
