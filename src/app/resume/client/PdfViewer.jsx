'use client'
import ReactPdfViewer from '@/components/ReactPdfViewer'
import cv from '@/content/cv'
import toKebabCase from '@/utils/kebab-case'
const PdfViewer = ({ searchParams }) => {
	const kebab_full_name = toKebabCase(cv.full_name)
	const queryString = new URLSearchParams(searchParams).toString()
	const fileURL = `/api/resume${!!queryString ? `?${queryString}` : ''}`
	return (
		<div style={{ flex: 1, display: 'flex' }}>
			<ReactPdfViewer fileUrl={fileURL} fileName={`CV__${kebab_full_name}.pdf`} />
		</div>
	)
}
export default PdfViewer
