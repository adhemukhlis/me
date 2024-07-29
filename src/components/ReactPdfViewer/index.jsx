/** packages
 * "pdfjs-dist": "2.16.105"
 * "@react-pdf-viewer/core": "^3.12.0"
 * "@react-pdf-viewer/default-layout": "^3.12.0"
 * "@react-pdf-viewer/get-file": "^3.12.0"
 */

import { Viewer, Worker, ProgressBar } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import { getFilePlugin } from '@react-pdf-viewer/get-file'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

import packageJson from '../../../package.json'
const pdfjsVersion = packageJson.dependencies['pdfjs-dist']

const ReactPdfViewer = ({ fileUrl, fileName = 'document.pdf' }) => {
	const getFilePluginInstance = getFilePlugin({
		fileNameGenerator: () => {
			return fileName
		}
	})
	const { DownloadButton } = getFilePluginInstance
	const renderToolbar = (Toolbar) => <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>
	const defaultLayoutPluginInstance = defaultLayoutPlugin({
		renderToolbar,
		sidebarTabs: (_defaultTabs) => [
			// Remove the attachments tab (\`defaultTabs[2]\`)
			// defaultTabs[0], // Bookmarks tab
			// defaultTabs[1] // Thumbnails tab
		]
	})
	const { renderDefaultToolbar } = defaultLayoutPluginInstance.toolbarPluginInstance
	const transform = (slot) => ({
		...slot,
		Open: () => <></>,
		Download: () => <DownloadButton />
	})

	return (
		<Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.js`}>
			<Viewer
				defaultScale={1}
				fileUrl={fileUrl}
				plugins={[defaultLayoutPluginInstance, getFilePluginInstance]}
				// defaultScale={SpecialZoomLevel.PageWidth}
				renderLoader={(percentages) => (
					<div style={{ width: '10rem' }}>
						<ProgressBar progress={Math.round(percentages)} />
					</div>
				)}
			/>
		</Worker>
	)
}

export default ReactPdfViewer
