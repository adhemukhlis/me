import dayjs from 'dayjs'
import { createPdf } from '@/components/PdfGenerator'
import resumeDocument from '@/components/PdfGenerator/TemplateDocuments/resumeDocument'
import cv from '@/content/cv'
import getHumanizeTime from '@/utils/get-humanize-time'
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
	update_at,
	experiences
} = cv
const [wa, ...other_contact] = contact
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
		const kebab_full_name = toKebabCase(full_name)
		const filename = `CV__${kebab_full_name}.pdf`
		const _update_at = dayjs(update_at).format('MMM YYYY')
		const _first_name = full_name.split(' ')[0]
		const _experiences = Array.isArray(experiences)
			? experiences.map(({ company_name, position, start, end, location, content, projects }) => ({
					company_name,
					position_and_duration: `${position} | ${!!start ? dayjs(start).format('MMM, YYYY') : '*'} - ${!!end ? dayjs(end).format('MMM, YYYY') : 'now'} (${getHumanizeTime(start, !!end ? end : dayjs().format('YYYY-MM-DD'))})`,
					location,
					content,
					projects: Array.isArray(projects) ? projects : []
				}))
			: []
		const _educations = Array.isArray(educations) ? educations : []
		const _city = [city, province].join(', ')
		const _skills = skills.map(({ label }) => label).join(' • ')
		const _technical_skills = technical_skills.map(({ label }) => label).join(' • ')
		const _certifications = certifications.map(({ label }) => label)

		console.log('INSIDE API', cv)

		const binaryResult = await createPdf({
			template: resumeDocument({
				full_name,
				position,
				city: _city,
				summary,
				contact: modified_contact,
				skills: _skills,
				technical_skills: _technical_skills,
				certifications: _certifications,
				educations: _educations,
				footer: `${_update_at}, ${_first_name}`,
				experiences: _experiences
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
