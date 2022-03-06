import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import test from 'ava'
import spritetify from '../src/sprite.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const fixture = path.resolve(__dirname, '__fixture')

test('basic', async t => {
	const out = await spritetify(fixture)
	t.snapshot(out)
})

test('out', async t => {
	const outputFile = path.resolve(fixture, 'out.svg')
	const message = await spritetify(fixture, outputFile)
	const data = await fs.promises.readFile(outputFile)
	t.snapshot(data)
	t.is(message, 'sprite generated successfully')
})

test('throws', async t => {
	const error = await t.throwsAsync(spritetify)
	t.is(error.message, '"inputDir" must be set')
})
