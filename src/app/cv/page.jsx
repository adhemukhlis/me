import { Suspense } from 'react'
import PdfViewer from './client/PdfViewer'

const CVPage = () => {
	return (
		<div style={{ flex: 1, display: 'flex' }}>
			<Suspense fallback={<div>loading</div>}>
				<PdfViewer />
			</Suspense>
		</div>
	)
}
export default CVPage
