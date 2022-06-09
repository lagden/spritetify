import _options from './options.js'

// Merge SVGO plugins options
function plugins(config) {
	return [...new Set([..._options, ...config])]
}

export default plugins
