#!/usr/bin/env node

import process from 'node:process'
import {URL} from 'node:url'
import fs from 'node:fs'
import path from 'node:path'
import {Command} from 'commander'
import chalk from 'chalk'
import sprite from '../src/sprite.js'
// import pkg from '../package.json' assert {type: 'json'}

const pkg = JSON.parse(
	await fs.promises.readFile(
		new URL('../package.json', import.meta.url),
	),
)

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
			options = JSON.parse(
				await fs.promises.readFile(
					new URL(path.resolve(process.cwd(), _file), import.meta.url),
				),
			)
		}

		const message = await sprite(inputDir, outputFile, options)
		ok(message, outputFile)
	} catch (error) {
		fail(error)
	}
}

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
