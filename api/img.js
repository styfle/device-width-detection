module.exports = function handler(req, res) {
  const url = new URL(req.url, 'https://example.com')
  const size = url.searchParams.get('w')
	if (size) {
		const accept = req.headers['accept']
		const acceptCh = req.headers['accept-ch']
		const userAgent = req.headers['user-agent']
		console.log({ size, accept, acceptCh, userAgent })
		const pos = 0
		const xmlns = 'http://www.w3.org/2000/svg'
		const style1 = 'font: bold 50px monospace'
		const style2 = 'font: 30px monospace'
		res.setHeader('Content-Type', 'image/svg+xml')
		res.end(`<svg xmlns="${xmlns}" version="1.1" width="${size}" height="${size}">
			<text x="${pos}" y="${pos + 100}" style="${style1}">Width: ${size}px</text>
			<text x="${pos}" y="${pos + 200}" style="${style2}">Accept: ${accept}</text>
			<text x="${pos}" y="${pos + 300}" style="${style2}">Accept: ${acceptCh}</text>
			<text x="${pos}" y="${pos + 400}" style="${style2}">User-Agent: ${userAgent}</text>
		</svg>`)
	} else {
		res.statusCode = 404
		res.end('Not Found')
	}
}

