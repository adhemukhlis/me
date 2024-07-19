import clsx from 'clsx'
import Image from 'next/image'
import { cv } from '@/content/cv'

const AboutPage = () => {
	return (
		<main className={clsx('flex-fill-container')}>
			<div className={clsx('content')}>
				<div className="avatar">
					<Image src="https://avatars.githubusercontent.com/u/22783552?v=4" width={180} height={180} alt="profile-picture" />
				</div>
				<h1>About</h1>
				<section className={clsx('about')}>
					<p>
						Hello, my name is <b>{cv.full_name}</b>, you can call me <b>{(cv.full_name ?? []).split(' ')[0]}</b> for short.
					</p>
					<p>
						{'I grew up in '}
						<b>{[cv.city, cv.province].join(', ')}</b>
						{'. Graduated from '}
						<b>{cv.educations.filter((obj) => 'GPA' in obj)?.[0].institution}</b>
						{' with a '}
						<b>{cv.educations.filter((obj) => 'GPA' in obj)?.[0].study_program}</b>
						{' and currently working as a Web Developer (you maybe more familiar with "'}
						<b>{cv.position}</b>
						{'")'}
					</p>
				</section>
			</div>
		</main>
	)
}
export default AboutPage
