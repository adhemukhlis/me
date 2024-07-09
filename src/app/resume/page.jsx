import { Suspense } from 'react'
import PdfViewer from './client/PdfViewer'

export const metadata = {
	title: 'Resume',
	viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
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
