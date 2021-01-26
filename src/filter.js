'use strict'

const fs = require('fs')
const path = require('path')
const isSvg = require('is-svg')

// validate if file is SVG
async function _analyse(file) {
	let filehandle
	try {
		filehandle = await fs.promises.open(file, 'r')
		const stats = await filehandle.stat({})
		if (stats.isFile()) {
			const buf = await filehandle.readFile({encoding: 'utf8'})
			return isSvg(buf) ? {file, buf} : false
		}
	} finally {
		/* istanbul ignore next */
		if (filehandle !== undefined) {
			await filehandle.close()
		}
	}
}

// array filter async
async function _filter(arr, predicate) {
	return arr.reduce(async (memo, e) => {
		const result = await predicate(e)
		return result ? [...await memo, result] : memo
	}, [])
}

// return only SVG files from directory
async function svgOnly(dir) {
	const files = await fs.promises.readdir(dir)
	const svgFiles = await _filter(files, file => _analyse(path.join(dir, file)))
	return svgFiles
}

module.exports = svgOnly
