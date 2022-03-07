import {optimize} from 'svgo'
import cheerio from 'cheerio'

// Convert svg code to symbol
function createSymbol(code, id) {
	const markup = cheerio.load(code, {xmlMode: true})
	const svgMarkup = markup('svg')

	markup('svg').replaceWith('<symbol/>')
	markup('symbol')
		.attr('id', id)
		.attr('viewBox', svgMarkup.attr('viewBox'))
		.append(svgMarkup.children())

	return markup.xml('symbol')
}

// Optimize and return symbol
async function svgSymbol(id, buf, config) {
	let symbol = ''
	const {data} = optimize(buf, config)
	if (data) {
		symbol = createSymbol(data, id)
	}
	return symbol
}

export default svgSymbol
