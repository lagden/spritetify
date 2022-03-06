import _options from './options.js'

// Merge SVGO plugins options
function plugins(opts) {
	const merge = {
		..._options,
		...opts,
		cleanupIDs: true,
		removeDimensions: true,
		removeViewBox: false,
	}
	return Object.entries(merge).map(([plugin, v]) => {
		const more = typeof v === 'boolean' ? {active: v} : {active: true, params: v}
		return {
			name: plugin,
			...more,
		}
	})
}

export default plugins
