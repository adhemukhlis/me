import clsx from 'clsx'
import Link from 'next/link'
import { cv } from '@/content/cv'

const RootPage = () => {
	return (
		<main className={clsx('flex-fill-container')}>
			<div className={clsx('content')}>
				<h1 className={clsx('full-name')}>
					<span>{cv.full_name}</span>
				</h1>
				<span className="vl" />
				<p className={clsx('summary', 'italic')}>{cv.summary}</p>
			</div>
			<div className={clsx('menu')}>
				<Link href="/cv">
					<button className="ui-btn">
						<span>CV</span>
					</button>
				</Link>
			</div>
		</main>
	)
}
export default RootPage
