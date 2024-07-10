import { createPdf } from '@/components/PdfGenerator'
import resumeDocument from '@/components/PdfGenerator/TemplateDocuments/resumeDocument'
import { cv } from '@/content/cv'
import toKebabCase from '@/utils/kebab-case'
const {
	full_name,
	position,
	city,
	province,
	summary,
	contact,
	skills,
	technical_skills,
	certifications,
	educations,
	update_at
} = cv
const [wa, ...other_contact] = contact

// const photoPath = path.join(rootDirectory, 'assets', 'images', profile_picture_filename)
export const GET = async (_request) => {
	// const searchParams = _request.nextUrl.searchParams
	// const full = searchParams.get('full') === 'true'
	const full = true
	const modified_contact = [
		...(!!full
			? [wa]
			: [{ ...wa, label: wa.label.substring(0, wa.label.length - 8) + 'XXXXXXXX', url: 'mailto:adhemukhlis@gmail.com' }]),
		...other_contact
	]
	console.info('SKILLS', skills)
	console.info('TSKILLS', technical_skills)

	try {
		const kebab_full_name = toKebabCase(full_name)
		const filename = `CV__${kebab_full_name}.pdf`
		const binaryResult = await createPdf({
			template: resumeDocument({
				full_name,
				position,
				city: [city, province].join(', '),
				summary,
				contact: modified_contact,
				skills,
				technical_skills,
				certifications,
				educations,
				update_at
			})
		})
		return new Response(binaryResult, {
			status: 200,
			headers: { 'Content-Disposition': `attachment; filename="${filename}"`, 'Content-Type': 'application/pdf' }
		})
	} catch (error) {
		return new Response(JSON.stringify({ status: 500, message: `Internal Server Error ${error}` }), {
			status: 500,
			headers: { 'content-type': 'application/json' }
		})
	}
}
