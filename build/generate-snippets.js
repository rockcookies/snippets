/* eslint-disable */
var glob = require('glob');
var path = require('path');
var fs = require("fs");
var fse = require('fs-extra');
var rm = require('rimraf');
var find = require('lodash/find');
var trim = require('lodash/trim');
var assign = require('lodash/assign');
var markdownIt = require('markdown-it');
var hljs = require('highlight.js');

var SNIPPETS_DIR = path.join(__dirname, '..', 'snippets');
var JSON_DIR = path.join(__dirname, '..', 'src/snippets/constants/snippets-tree.json');
var OUTPUT_DIR = path.join(__dirname, '..', 'static/snippets');

var markdown = markdownIt({
	html: true,
	highlight: function (str, lang) {
		try {
			if (lang && hljs.getLanguage(lang)) {
				return hljs.highlight(lang, str).value;
			} else {
				return hljs.highlightAuto(str).value;
			}
		} catch (__) {}

		return '';
	}
});

function parseContent (content) {
	var attrText = '';
	var newContent = content.replace(/^---([\s\S]+?)---/g, function ($1, $2) {
		attrText = $2;
		return '';
	});

	var attrs = {};

	attrText.split('\n').forEach(function(attrLine) {
		var attr = attrLine.split(':');
		if (attr.length < 2) {
			return;
		}
		var name = trim(attr.shift());
		var value = trim(attr.join(''));
		attrs[name] = value;
	});

	return {
		content: markdown.render(newContent),
		attrs: attrs
	};
}

rm(OUTPUT_DIR, function () {
	var tree = [];

	glob.sync(path.join(SNIPPETS_DIR, '**/*.md')).forEach(function (file) {
		var category = path.relative(SNIPPETS_DIR, path.dirname(file));
		var categoryObj = find(tree, function (o) {
			return o.category === category;
		});

		if (!categoryObj) {
			categoryObj = {
				category: category,
				children: []
			};
			tree.push(categoryObj);
		}

		var name = path.basename(file).replace(/.md$/, '');
		var result = parseContent(fs.readFileSync(file, 'utf-8'));

		categoryObj.children.push(assign({}, result.attrs, {
			category: category,
			url: '/' + category + '/' + name + '.html'
		}));

		fse.outputFileSync(path.join(OUTPUT_DIR, category, name + '.html'), result.content);
	});

	fse.outputJsonSync(JSON_DIR, tree);
})
