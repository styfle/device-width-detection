const deviceWidths = [320, 375, 414, 480, 640, 828, 1024, 1080, 1112, 1200, 1334, 1536, 1668, 1920, 2070, 2224, 2470, 2482, 3000]
const srcset = deviceWidths.map(w => `/api/img${w} ${w}w`)

module.exports = function handler(req, res) {
	const match = /img([0-9]+)/.exec(req.url)
	if (match && match[1]) {
		const size = match[1]
		const accept = req.headers['accept']
		const userAgent = req.headers['user-agent']
		console.log({ size, accept, userAgent })
		const pos = 0
		const xmlns = 'http://www.w3.org/2000/svg'
		const style1 = 'font: bold 50px monospace'
		const style2 = 'font: 30px monospace'
		res.setHeader('Content-Type', 'image/svg+xml')
		res.end(`<svg xmlns="${xmlns}" version="1.1" width="${size}" height="${size}">
			<text x="${pos}" y="${pos + 100}" style="${style1}">Width: ${size}px</text>
			<text x="${pos}" y="${pos + 200}" style="${style2}">Accept: ${accept}</text>
			<text x="${pos}" y="${pos + 300}" style="${style2}">User-Agent: ${userAgent}</text>
		</svg>`)
	} else if (req.url === '/') {
		res.setHeader('Content-Type', 'text/html')
		res.end(`<html>
		<head>
			<meta name="viewport" content="width=device-width"/>
			<meta charSet="utf-8"/>
			<style>img { width:100vw; height:auto; }</style>
		</head>
		<body>
			<img src="/fallback.svg" srcset="${srcset}" />
		</body>
		</html>
		`)
	} else {
		res.statusCode = 404
		res.end('Not Found')
	}

}

