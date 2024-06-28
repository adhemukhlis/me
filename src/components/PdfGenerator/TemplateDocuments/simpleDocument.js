import { cm } from '@/components/PdfGenerator/utils/unit'

const gapSize = 16

const simpleDocument = () => ({
	permissions: {
		printing: 'highResolution',
		modifying: false,
		copying: false,
		annotating: true,
		fillingForms: true,
		contentAccessibility: false,
		documentAssembly: true
	},
	pageSize: 'A4',
	pageMargins: [cm(2), cm(2), cm(2), cm(2)],
	info: {
		title: `SIMPLE DOCUMENT`,
		author: '',
		subject: 'dummy document',
		keywords: 'dummy',
		creator: '',
		producer: ''
	},
	content: [{ alignment: 'center', style: { bold: true, fontSize: 24 }, text: 'SIMPLE DOCUMENT' }],
	defaultStyle: {
		color: '#000',
		fontSize: 10,
		columnGap: gapSize
	}
})
export default simpleDocument
