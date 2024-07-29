import clsx from 'clsx'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { getBlogPosts } from '../_actions/blog/get-blog-posts'

export const metadata = {
	title: 'Blog'
}
const BlogPage = async () => {
	const blogPostResponse = await getBlogPosts()
	const blogPosts = Array.isArray(blogPostResponse.data.posts) ? blogPostResponse.data.posts : []
	return (
		<main className={clsx('flex-fill-container')}>
			<div className={clsx('content')}>
				<h1>Blog</h1>
				<div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
					{blogPosts.map((post, index) => {
						return (
							<div key={index} className={clsx('blog-card')}>
								<Link href={`/blog/${post.slug}`}>
									<h2>{post.title}</h2>
								</Link>
								<small>{dayjs(post.updated_at).format('MMM DD')}</small>
								<span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
									<span style={{ borderRadius: '50%', width: 32, aspectRatio: '1/1', overflow: 'hidden' }}>
										<Image src={post.author.avatar} width={32} height={32} alt={`${post.author.username} avatar`} />
									</span>
									<Link href={post.author.github_url}>{post.author.username}</Link>
								</span>
							</div>
						)
					})}
				</div>
			</div>
		</main>
	)
}
export default BlogPage
