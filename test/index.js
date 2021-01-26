'use strict'

const fs = require('fs')
const path = require('path')
const test = require('ava')
const spritetify = require('../src/sprite')

test('basic', async t => {
	const out = await spritetify(path.resolve(__dirname, '__fixture'))
	t.snapshot(out)
})

test('out', async t => {
	const outputFile = path.resolve(__dirname, '__fixture', 'out.svg')
	const message = await spritetify(path.resolve(__dirname, '__fixture'), outputFile)
	const data = await fs.promises.readFile(outputFile)
	t.snapshot(data)
	t.is(message, 'sprite generated successfully')
})

test('throws', async t => {
	const error = await t.throwsAsync(spritetify)
	t.is(error.message, '"inputDir" must be set')
})
