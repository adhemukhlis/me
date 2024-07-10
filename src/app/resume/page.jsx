import { Suspense } from 'react'
import PdfViewer from './client/PdfViewer'

export const metadata = {
	title: 'Resume'
}
export const viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	userScalable: false
}
const CVPage = ({ searchParams }) => {
	return (
		<div style={{ flex: 1, display: 'flex' }}>
			<Suspense fallback={<div>loading</div>}>
				<PdfViewer searchParams={searchParams} />
			</Suspense>
		</div>
	)
}
export default CVPage
