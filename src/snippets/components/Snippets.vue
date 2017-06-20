<template>
	<div>
		<div class="types fn-clear">
			<a
				v-for="node in snippetsTree"
				:class="['item', activeCategory && node.category === activeCategory.category && 'active']"
				@click="handleCategoryFocused(node)"
			>
				<span>{{ node.category.toUpperCase() }}</span>
			</a>
			<a class="search" @click="searchVisible = true"><i class="fa fa-search"></i></a>
		</div>

		<div :class="['searchbox', searchVisible && 'active']">
			<div class="modal">
				<div class="modal-header">
					<a class="fa fa-close close" @click="searchVisible = false"></a>
					<div class="input"><input type="text" placeholder="请输入搜索的标题" v-model="searchValue"></div>
				</div>

				<ul class="modal-content">
					<li class="empty" v-if="!searchResult.length">没有搜索结果</li>
					<li class="item" v-for="item in searchResult" @click="handleSearchItemFocus(item)"><span v-html="item.title"></span></li>
				</ul>
			</div>
		</div>

		<div :class="['codebox-wrapper fn-clear', activeItemVisible && activeItem && 'expand']">
			<ul class="typelist">
				<li
					v-for="item in (activeCategory && activeCategory.children)"
					:class="[item === activeItem ? 'active' : '']"
				>
					<a @click="handleItemFocused(item)"><span>{{ item.title }}</span></a>
				</li>
			</ul>
			<div class="codebox">
				<div class="title">
					<h2>{{activeItem && activeItem.title}}</h2>
					<div class="tools">
						<a class="fa fa-close" @click="handleContentClose"></a>
					</div>
				</div>

				<div class="markdown preview-markdown" v-html="activeContent"></div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import debounce from 'lodash/debounce';
import trim from 'lodash/trim';
import router from '../router';

const findCategory = (tree = [], cmp = () => false) => {
	for (const node of tree) {
		if (cmp(node)) {
			return node;
		}
	}
};

const findItem = (tree = [], cmp = () => false) => {
	for (const node of tree) {
		for (const item of (node.children || [])) {
			if (cmp(item)) {
				return item;
			}
		}
	}
};

const snippetsCache = {};

export default {
	name: 'snippets',
	data() {
		return {
			snippetsTree: require('../constants/snippets-tree.json'),
			activeCategory: null,
			activeItem: null,
			activeItemVisible: true,
			activeContent: 'loading',
			searchVisible: false,
			searchValue: '',
			searchResult: []
		};
	},
	created() {
		this.fetchData();
	},
	filters: {
		highlight(words, query) {
			const iQuery = new RegExp(query, 'ig');
			return words.toString().replace(iQuery, (matchedTxt) => `<font class="highlight">${matchedTxt}</font>`);
		}
	},
	watch: {
		$route: 'fetchData',
		searchValue(value) {
			this.handleSearchInput(value);
		}
	},
	methods: {
		handleSearchInput: debounce(function (value) {
			const result = [];
			value = trim(value);

			if (!value) {
				this.searchResult = result;
				return;
			}

			const iQuery = new RegExp(value, 'ig');

			for (const node of this.snippetsTree) {
				for (const item of (node.children || [])) {
					if (item && item.title.indexOf(value) > -1) {
						result.push({
							title: item.title.replace(iQuery, (matchedTxt) => `<font class="highlight">${matchedTxt}</font>`),
							url: item.url
						});
					}
				}
			}

			this.searchResult = result;
		}, 300),

		handleSearchItemFocus(item) {
			const { activeItem } = this;

			this.searchVisible = false;

			if (activeItem && activeItem.url === item.url) {
				return;
			}

			router.push(item.url);
		},

		handleContentClose() {
			this.activeItemVisible = false;
		},
		handleCategoryFocused(category) {
			// 已经被聚焦
			if (this.activeCategory === category) {
				return;
			}

			this.activeCategory = category;
			this.activeItemVisible = false;
		},
		handleItemFocused(item) {
			// 已经被聚焦
			if (this.activeItem === item) {
				this.activeItemVisible = true;
				return;
			}

			router.push(item.url);
		},
		fetchData() {
			const snippetsTree = this.snippetsTree;
			let url = this.$route.path;

			if (url === '/') {
				url = snippetsTree[0].children[0].url; // 默认选择第一个
			}

			const item = findItem(snippetsTree, (i) => (i.url === url));
			if (!item) {
				return;
			}

			this.activeItem = item;
			this.activeCategory = findCategory(snippetsTree, (i) => (i.category === item.category));

			if (snippetsCache[url]) {
				this.activeItemVisible = true;
				this.activeContent = snippetsCache[url];
				return;
			}

			axios.get(`/static/snippets${url}`).then(resp => {
				this.activeItemVisible = true;

				snippetsCache[url] = resp.data;

				if (this.activeItem === item) {
					this.activeContent = resp.data;
				}
			});
		}
	}

};
</script>

<style lang="less" scoped>
@import "./Snippets.less";
</style>
