import fs from 'fs'
import path from 'path'
import { createPdf } from '@/components/PdfGenerator'
import cvDocument from '@/components/PdfGenerator/TemplateDocuments/cvDocument'
import cv from '@/content/cv'
import toKebabCase from '@/utils/kebab-case'
const rootDirectory = path.join(process.cwd(), 'src')
const {
	profile_picture_filename,
	full_name,
	position,
	city,
	province,
	country,
	summary,
	contact,
	skills,
	technical_skills,
	certifications,
	educations,
	update_at
} = cv
const [wa, ...other_contact] = contact

const photoPath = path.join(rootDirectory, 'assets', 'images', profile_picture_filename)
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

	try {
		const imageBuffer = fs.readFileSync(photoPath)
		const base64_photo_profile = imageBuffer.toString('base64')
		const kebab_full_name = toKebabCase(full_name)
		const filename = `CV__${kebab_full_name}.pdf`
		const binaryResult = await createPdf({
			template: cvDocument({
				photo_profile: base64_photo_profile,
				full_name,
				position,
				city,
				province,
				country,
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
