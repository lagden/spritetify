'use strict'

module.exports = {
	env: {
		node: true
	},
	extends: [
		'xo',
		'plugin:unicorn/recommended'
	],
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'semi-spacing': [
			'error',
			{
				before: false,
				after: true
			}
		],
		camelcase: 0,
		'no-console': 0,
		'capitalized-comments': 0,
		'spaced-comment': 0,
		'unicorn/prevent-abbreviations': 0,
		'unicorn/filename-case': 0,
		'unicorn/no-array-reduce': 0,
		'padding-line-between-statements': 0
	}
}
