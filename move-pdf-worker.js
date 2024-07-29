// move-worker.js
const fs = require('fs-extra')
const path = require('path')

const sourcePath = path.join(__dirname, 'node_modules/pdfjs-dist/build/pdf.worker.min.js')
const destinationPath = path.join(__dirname, 'public/js/pdf.worker.min.js')

fs
	.pathExists(destinationPath)
	.then((exists) => {
		if (!exists) {
			return fs.copy(sourcePath, destinationPath)
		} else {
			console.log('Destination file already exists:', destinationPath)
		}
	})
	.then(() => console.log('File copy operation completed'))
	.catch((err) => console.error('Error copying file:', err))
