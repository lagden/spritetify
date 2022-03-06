import process from 'node:process'
import {URL} from 'node:url'
import {promisify} from 'node:util'
import fs from 'node:fs'
import stream from 'node:stream'
import path from 'node:path'
import plugin from './plugin.js'
import filter from './filter.js'
import parse from './parse.js'

const pipeline = promisify(stream.pipeline)

// Create SVG sprite file from directory
async function spritetify(inputDir, outputFile, options = {}) {
	if (!inputDir) {
		throw new Error('"inputDir" must be set')
	}

	const cwd = process.cwd()

	// get svg files
	const _dir = path.resolve(cwd, inputDir)
	const files = await filter(_dir)

	// prepare svgo plugins
	const plugins = plugin(options)

	// set symbol id
	const _id = options?.id ?? '%s'
	const symbols = files.map(({file, buf}) => {
		const base = path.basename(file, '.svg')
		const id = _id.replace('%s', base)
		return parse(id, buf, plugins)
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
		const _outputFile = new URL(path.resolve(cwd, outputFile), import.meta.url)
		await pipeline(
			stream.Readable.from(outData),
			fs.createWriteStream(_outputFile),
		)

		return 'sprite generated successfully'
	}

	return outData
}

export default spritetify
