'use client'
import { useEffect, useState } from 'react'
import ReactPdfViewer from '@/components/ReactPdfViewer'
import { cv } from '@/content/cv'
import toKebabCase from '@/utils/kebab-case'
const PdfViewer = () => {
	const [fileUrl, setFileUrl] = useState(undefined)
	const kebab_full_name = toKebabCase(cv.full_name)

	useEffect(() => {
		const urlOrigin = window.location.origin
		setFileUrl(`${urlOrigin}/api/cv`)
	}, [])

	return (
		<div style={{ flex: 1, display: 'flex' }}>
			{fileUrl !== undefined ? <ReactPdfViewer fileUrl={fileUrl} fileName={`CV__${kebab_full_name}.pdf`} /> : <></>}
		</div>
	)
}
export default PdfViewer
