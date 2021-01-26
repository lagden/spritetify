#!/usr/bin/env node

'use strict'

const fs = require('fs')
const	path = require('path')
const {Command} = require('commander')
const chalk = require('chalk')
const sprite = require('../src/sprite')
const pkg = require('../package.json')

const _fail = chalk.bold.red
const _ok = chalk.bold.green

function fail(error) {
	process.stderr.write(_fail(`✖ ${error.message}`))
	process.exit(1)
}

function ok(message, outputFile = false) {
	const _m = outputFile ? _ok(`✓ ${message}`) : message
	process.stdout.write(_m)
	process.exit(0)
}

const program = new Command()

async function run(opts) {
	try {
		const {inputDir, outputFile, configFile} = opts
		let options = {}
		if (configFile) {
			const _file = configFile === true ? 'spritetify.config.json' : configFile
			const configJSON = await fs.promises.readFile(path.resolve(process.cwd(), _file))
			options = JSON.parse(configJSON)
		}
		const message = await sprite(inputDir, outputFile, options)
		ok(message, outputFile)
	} catch (error) {
		fail(error)
	}
}

(async () => {
	program
		.name('spritetify')
		.version(pkg.version)
		.description(pkg.description)
		.passThroughOptions()
		.requiredOption('-d, --inputDir <dir>', 'directory with the SVG files')
		.option('-o, --outputFile <file>', 'name with path of output file')
		.option('-c, --configFile [json]', 'plugin options')

	await program.parseAsync(process.argv)

	const options = program.opts()
	await run(options)
})()
