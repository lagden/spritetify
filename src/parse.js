'use strict'

const cheerio = require('cheerio')

// Convert svg code to symbol
function createSymbol(code, symbolId) {
	const markup = cheerio.load(code, {xmlMode: true})
	const svgMarkup = markup('svg')

	markup('svg').replaceWith('<symbol/>')
	markup('symbol')
		.attr('id', symbolId)
		.attr('viewBox', svgMarkup.attr('viewBox'))
		.append(svgMarkup.children())

	return markup.xml('symbol')
}

// Optimize and return symbol
async function svgSymbol(id, buf, svgo) {
	let symbol = ''
	const {data} = await svgo.optimize(buf)
	if (data) {
		symbol = createSymbol(data, id)
	}
	return symbol
}

module.exports = svgSymbol
