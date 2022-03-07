import _options from './options.js'

// Merge SVGO plugins options
function plugins(config) {
	if (Array.isArray(config)) {
		return [..._options, ...config]
	}

	return _options
}

export default plugins
