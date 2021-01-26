'use strict'

const _options = require('./options')

// Merge SVGO plugins options
function plugins(opts) {
	const merge = {..._options, ...opts, ...{
		cleanupIDs: true,
		removeDimensions: true,
		removeViewBox: false
	}}
	return Object.entries(merge).map(([plugin, v]) => ({[plugin]: v}))
}

module.exports = plugins
