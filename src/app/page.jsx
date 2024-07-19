import clsx from 'clsx'
import Link from 'next/link'
import { cv } from '@/content/cv'

const RootPage = () => {
	return (
		<main className={clsx('flex-fill-container')}>
			<div className={clsx('content')}>
				<div className={clsx('name-card')}>
					<h1 className={clsx('full-name')}>
						<span>{cv.full_name}</span>
					</h1>
					<span className="vl" />
					<div className={clsx('summary')}>
						<div>
							<p>{cv.summary}</p>
						</div>
					</div>
				</div>
			</div>
			<div className={clsx('menu')}>
				<Link href="/about">
					<span>About</span>
				</Link>
				<Link href="/blog">
					<span>Blog</span>
				</Link>
				<Link href="/resume">
					<span>Resume</span>
				</Link>
				<Link href="/cv">
					<span>CV</span>
				</Link>
			</div>
		</main>
	)
}
export default RootPage
