import {optimize} from 'svgo'
import cheerio from 'cheerio'

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
async function svgSymbol(id, buf, plugins) {
	let symbol = ''
	const {data} = optimize(buf, {plugins})
	if (data) {
		symbol = createSymbol(data, id)
	}
	return symbol
}

export default svgSymbol
