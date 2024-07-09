import dayjs from 'dayjs'
import emailIcon from '@/assets/Base64Icon/email'
import githubIcon from '@/assets/Base64Icon/github'
import linkedinIcon from '@/assets/Base64Icon/linkedin'
import locationIcon from '@/assets/Base64Icon/location'
import whatsappIcon from '@/assets/Base64Icon/whatsapp'
var duration = require('dayjs/plugin/duration')
var relativeTime = require('dayjs/plugin/relativeTime')

dayjs.extend(duration)
dayjs.extend(relativeTime)

const gapSize = 16
const getHumanizeTime = (from_date_iso_string, to_date_iso_string) => {
	const toDate = !!to_date_iso_string ? dayjs(to_date_iso_string) : dayjs()
	return dayjs.duration(dayjs(from_date_iso_string).diff(toDate, 'months'), 'months').humanize()
}
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
	update_at
}) => ({
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
	pageMargins: [24, 40, 24, 40],
	info: {
		title: `Resume ${full_name}`,
		author: full_name,
		subject: 'Resume',
		keywords: 'Resume',
		creator: full_name,
		producer: full_name
	},
	footer: (currentPage, pageCount) => {
		return [
			{
				margin: [24, 0],
				columns: [
					{
						width: 60,
						fillColor: '#ff00ff',
						text: `${dayjs(update_at).format('YYYYMMDD')}`,
						color: '#E2E2E2'
					},
					{
						width: '*',
						fillColor: '#ff0000',
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
							[{ text: full_name, style: 'fullNameStyle' }],
							[{ text: position, fontSize: 12, bold: true }],
							[
								{
									text: summary,
									style: 'contentStyle'
								}
							],
							[{ text: 'EXPERIENCE', style: 'titleStyle' }],
							[
								{
									text: 'PT Wiratek Solusi Asia',
									style: 'titleContentStyle'
								}
							],
							[
								{
									text: `Front-End Developer | July, 2021 - April, 2024 (${getHumanizeTime('2021-07-8', '2024-04-25')})`
								}
							],
							[{ text: 'Jakarta, Indonesia', fontSize: 10 }],
							[
								{
									text:
										'Involved in several projects using Vue.js, React.js, and Next.js. Sometimes also helps define API specifications, deploys on servers with Docker, and maintains internal team code quality.\nProjects involved:',
									style: 'contentStyle'
								}
							],
							[
								{
									ol: ['Flowalytics', 'Kostzy CoLiveWorkPlay']
								}
							],
							[
								{
									text: 'PT Samudra Biru Development',
									style: 'titleContentStyle'
								}
							],
							[
								{
									text: `Front-End Developer | July, 2020 - March, 2021 (${getHumanizeTime('2020-07-22', '2021-03-10')})`
								}
							],
							[{ text: 'Bogor, Indonesia', fontSize: 10 }],
							[
								{
									text: 'Involved in developing Payroll and Human Resource Apps.',
									style: 'contentStyle'
								}
							]
						]
					}
				},
				{
					width: '*',
					layout: 'noBorders',
					table: {
						widths: ['*'],
						body: [
							[
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
											...(contact || [])
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
							],
							[{ text: 'EDUCATION', style: 'titleStyle' }],
							...(educations || []).flatMap(
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
							),
							[{ text: 'SKILLS', style: 'titleStyle' }],
							[
								{
									text: 'Specialties',
									style: 'titleContentStyle'
								}
							],
							[
								{
									text: skills.join(' • ')
								}
							],
							[
								{
									text: 'Tools',
									style: 'titleContentStyle'
								}
							],
							[
								{
									text: technical_skills.join(' • ')
								}
							],
							[{ text: 'Certifications', style: 'titleContentStyle' }],
							[
								{
									ul: certifications
								}
							]
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
})

export default resumeDocument
