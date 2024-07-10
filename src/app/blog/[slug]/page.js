import { getBlogContent } from '@/app/_actions/blog/get-blog-post-content'

export const generateMetadata = async ({ params, searchParams: _searchParams }, _parent) => {
	const slug = params.slug

	return {
		title: slug
	}
}
const BlogDetailPage = async ({ params }) => {
	const blogPostContentResponse = await getBlogContent(params.slug)
	const blogPostContent = blogPostContentResponse.data.contentHtml ?? ''
	const metadataContentTitle = blogPostContentResponse.data?.metadata.title ?? ''
	return (
		<div
			style={{
				flex: 1,
				display: 'flex',
				flexDirection: 'column',
				paddingLeft: '4rem',
				paddingRight: '4rem',
				gap: '4rem'
			}}>
			<h1>{metadataContentTitle}</h1>
			<article
				dangerouslySetInnerHTML={{
					__html: blogPostContent
				}}
			/>
		</div>
	)
}
export default BlogDetailPage
