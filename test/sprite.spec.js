import path from 'node:path'
import {readFile} from 'node:fs/promises'
import {
	URL,
	fileURLToPath,
	pathToFileURL,
} from 'node:url'
import test from 'ava'
import spritetify from '../src/sprite.js'

const configFile = pathToFileURL(path.resolve(process.cwd(), 'spritetify.config.json'))
const configBuf = await readFile(configFile)
const config = JSON.parse(configBuf)

const fixture = fileURLToPath(new URL('__fixture', import.meta.url))
const outputFile = fileURLToPath(new URL('__fixture/out.svg', import.meta.url))

test('basic', async t => {
	const out = await spritetify(fixture)
	t.snapshot(out)
})

test('out', async t => {
	const message = await spritetify(fixture, outputFile, config)
	const data = await readFile(outputFile)
	t.snapshot(data.toString())
	t.is(message, 'sprite generated successfully')
})

test('throws', async t => {
	const error = await t.throwsAsync(spritetify)
	t.is(error.message, '"inputDir" must be set')
})
