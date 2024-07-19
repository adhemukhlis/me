import { createHighlighter } from 'shiki'
import ButtonCopy from './_components/button-copy'
import { getBlogContent } from '@/app/_actions/blog/get-blog-post-content'

const highlighter = await createHighlighter({
	themes: ['one-dark-pro', 'one-light'],
	langs: ['javascript', 'typescript', 'js', 'ts', 'jsx', 'tsx']
})
const codeToHtml = (str, lang) =>
	highlighter.codeToHtml(str, {
		lang,
		themes: {
			light: 'one-light',
			dark: 'one-dark-pro'
		}
	})
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
			<article>
				{blogPostContent.map((content, i) => {
					if (content.type === 'code') {
						return (
							<div
								key={i}
								style={{
									borderRadius: '0.4rem',
									overflow: 'hidden',
									border: '1px solid hsl(0, 0%, 92%, 1))',
									fontFamily: 'monospace'
								}}>
								<div
									style={{
										backgroundColor: '#f5f5f5',
										height: '2.8rem',
										padding: '0 1rem 0 1rem',
										borderBottom: '1px solid hsl(0, 0%, 92%, 1))',
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center'
									}}>
									<div style={{ display: 'flex', flex: 1 }}>
										<span>{content.content.filePath}</span>
									</div>
									<div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
										<span>{content.content.language}</span>
										<ButtonCopy value={content.content.code} />
									</div>
								</div>
								<div style={{ overflowX: 'auto' }}>
									<div
										dangerouslySetInnerHTML={{
											__html: codeToHtml(content.content.code, content.content.language)
										}}
									/>
								</div>
							</div>
						)
					} else {
						return (
							<span
								key={i}
								dangerouslySetInnerHTML={{
									__html: content.content
								}}
							/>
						)
					}
				})}
			</article>
		</div>
	)
}
export default BlogDetailPage
