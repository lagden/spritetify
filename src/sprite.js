'use strict'

const {promisify} = require('util')
const fs = require('fs')
const stream = require('stream')
const	path = require('path')
const SVGO = require('svgo')
const plugin = require('./plugin')
const svgOnly = require('./filter')
const svgSymbol = require('./parse')

const pipeline = promisify(stream.pipeline)

// Create SVG sprite file from directory
async function spritetify(inputDir, outputFile, options = {}) {
	if (!inputDir) {
		throw new Error('"inputDir" must be set')
	}

	// get svg files
	const _dir = path.resolve(process.cwd(), inputDir)
	const files = await svgOnly(_dir)

	// prepare svgo
	const plugins = plugin(options)
	const svgo = new SVGO({
		plugins
	})

	// set symbol id
	const _id = options?.id ?? '%s'
	const symbols = files.map(({file, buf}) => {
		const base = path.basename(file, '.svg')
		const id = _id.replace('%s', base)
		return svgSymbol(id, buf, svgo)
	})

	// build sprite
	const out = []
	out.push('<svg width="0" height="0" display="none" version="1.1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">')
	for await (const symbol of symbols) {
		out.push(symbol)
	}
	out.push('</svg>')
	const outData = out.join('')

	if (outputFile) {
		// write content in file
		await pipeline(
			stream.Readable.from(outData),
			fs.createWriteStream(path.resolve(process.cwd(), outputFile))
		)

		return 'sprite generated successfully'
	}

	return outData
}

module.exports = spritetify
