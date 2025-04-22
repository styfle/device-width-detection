// @ts-check

function getHeader(req, name) {
	let value = req.headers[name.toLowerCase()]
	if (value === undefined) {
		value = ''
	}
	return `${name}: ${value}`
}

module.exports = function handler(req, res) {
  const url = new URL(req.url, 'https://example.com')
	const headers = req.headers
  const size = url.searchParams.get('w')
	if (!size) {
		res.statusCode = 404
		res.end('Not Found')
		return
	}
	let pos = 0
	const xmlns = 'http://www.w3.org/2000/svg'
	const style1 = 'font: bold 50px monospace'
	const style2 = 'font: 30px monospace'
	res.setHeader('accept-ch', 'downlink, ect, rtt, save-data')
	res.setHeader('content-type', 'image/svg+xml')
	res.end(`<svg xmlns="${xmlns}" version="1.1" width="${size}" height="${size}">
		<text x="0" y="${pos += 75}" style="${style1}">Width: ${size}px</text>
		<text x="0" y="${pos += 75}" style="${style2}">${getHeader(req, 'Accept')}</text>
		<text x="0" y="${pos += 75}" style="${style2}">${getHeader(req, 'Downlink')}</text>
		<text x="0" y="${pos += 75}" style="${style2}">${getHeader(req, 'ECT')}</text>
		<text x="0" y="${pos += 75}" style="${style2}">${getHeader(req, 'RTT')}</text>
		<text x="0" y="${pos += 75}" style="${style2}">${getHeader(req, 'Save-Data')}</text>
		<text x="0" y="${pos += 75}" style="${style2}">${getHeader(req, 'User-Agent')}</text>
	</svg>`)
}

