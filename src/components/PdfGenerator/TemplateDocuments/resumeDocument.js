import { gapSize, pageMargins, pageSize, permissions } from '../utils/config'
import emailIcon from '@/assets/Base64Icon/email'
import githubIcon from '@/assets/Base64Icon/github'
import linkedinIcon from '@/assets/Base64Icon/linkedin'
import locationIcon from '@/assets/Base64Icon/location'
import whatsappIcon from '@/assets/Base64Icon/whatsapp'

const availableContactIcon = {
	whatsapp: whatsappIcon,
	email: emailIcon,
	github: githubIcon,
	linkedin: linkedinIcon
}
const availableContactType = Object.keys(availableContactIcon)

const resumeDocument = ({
	full_name,
	position,
	city,
	summary,
	contact,
	skills,
	technical_skills,
	certifications,
	educations,
	footer,
	experiences
}) => {
	const FooterSection = {
		width: 100,
		text: footer
	}
	const FullNameSection = [{ text: full_name, style: 'fullNameStyle' }]
	const PositionSection = [{ text: position, fontSize: 12, bold: true }]
	const SummarySection = [
		{
			text: summary,
			style: 'contentStyle'
		}
	]
	const ExperiencesSection = experiences.flatMap(
		({ company_name, position_and_duration, location, content, projects }) => [
			[
				{
					text: company_name,
					style: 'titleContentStyle'
				}
			],
			[
				{
					text: position_and_duration
				}
			],
			[{ text: location, fontSize: 10 }],
			[
				{
					text: content,
					style: 'contentStyle'
				}
			],
			[
				{
					ol: projects
				}
			]
		]
	)
	const EducationsSection = educations.flatMap(
		({ study_program, institution, year_of_start, year_of_end, final_project_description, ...other }) => [
			[
				{
					text: institution || '<institution>',
					style: 'titleContentStyle'
				}
			],
			[
				{
					text: `${study_program || '<study_program>'} (${year_of_start || '<year_of_start>'} - ${year_of_end || '<year_of_end>'})`,
					style: 'subContentStyle'
				}
			],
			[
				{
					text: final_project_description
				}
			],
			...(Object.keys(other).length > 0
				? [
						[
							{
								ul: [`GPA : ${other?.GPA || '<GPA>'}`]
							}
						]
					]
				: [])
		]
	)
	const SpecialtiesSection = [
		{
			text: skills
		}
	]
	const ToolsSection = [
		{
			text: technical_skills
		}
	]
	const CertificationsSection = [
		{
			ul: certifications
		}
	]
	const ContactSection = [
		{
			width: '*',
			layout: 'noBorders',
			table: {
				widths: [16, '*'],
				body: [
					[
						{
							svg: locationIcon,
							fit: [16, 16]
						},
						city
					],
					...contact
						.filter((item) => availableContactType.includes(item?.type))
						.map((item) => [
							{
								svg: availableContactIcon[item?.type],
								fit: [16, 16]
							},
							{
								text: (item?.label || '')
									.split(/(.{21})/)
									.filter((chunk) => chunk.length > 0)
									.join('\n'),
								link: item.url
							}
						])
				]
			}
		}
	]

	return {
		permissions,
		pageSize,
		pageMargins,
		info: {
			title: `Resume ${full_name}`,
			author: full_name,
			subject: 'Resume',
			keywords: 'Resume',
			creator: full_name
			// producer: full_name
		},
		footer: (currentPage, pageCount) => {
			return [
				{
					margin: [24, 0],
					columns: [
						FooterSection,
						{
							width: '*',
							alignment: 'right',
							text: currentPage.toString() + ' of ' + pageCount
						}
					]
				}
			]
		},
		content: [
			{
				columns: [
					{
						width: '*',
						layout: 'noBorders',
						table: {
							widths: ['*'],
							body: [
								FullNameSection,
								PositionSection,
								SummarySection,
								[{ text: 'EXPERIENCE', style: 'titleStyle' }],
								...ExperiencesSection // need spread array
							]
						}
					},
					{
						width: '*',
						layout: 'noBorders',
						table: {
							widths: ['*'],
							body: [
								ContactSection,
								[{ text: 'EDUCATION', style: 'titleStyle' }],
								...EducationsSection, // need spread array
								[{ text: 'SKILLS', style: 'titleStyle' }],
								[
									{
										text: 'Specialties',
										style: 'titleContentStyle'
									}
								],
								SpecialtiesSection,
								[
									{
										text: 'Tools',
										style: 'titleContentStyle'
									}
								],
								ToolsSection,
								[{ text: 'Certifications', style: 'titleContentStyle' }],
								CertificationsSection
							]
						}
					}
				]
			}
		],
		styles: {
			fullNameStyle: {
				fontSize: 14,
				bold: true
			},
			titleStyle: {
				fontSize: 10,
				bold: true,
				color: '#666666',
				margin: [0, gapSize, 0, (gapSize / 2) * -1]
			},
			subContentStyle: {
				color: '#666666'
			},
			titleContentStyle: {
				bold: true,
				fontSize: 12,
				margin: [0, gapSize / 2, 0, 0]
			},
			contentStyle: {
				alignment: 'justify',
				margin: [0, gapSize / 3, 0, 0]
			}
		},
		defaultStyle: {
			color: '#000',
			columnGap: gapSize
		}
	}
}

export default resumeDocument
