import Vue from 'vue';
import App from './snippets/components/App.vue';
import router from './snippets/router';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App }
});

