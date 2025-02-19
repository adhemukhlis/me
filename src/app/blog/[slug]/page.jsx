import clsx from 'clsx'
// import { createHighlighter } from 'shiki'
// import ButtonCopy from './_components/button-copy'
import { getBlogContent } from '@/app/_actions/blog/get-blog-post-content-new'

// const highlighter = await createHighlighter({
// 	themes: ['one-dark-pro', 'one-light'],
// 	langs: ['javascript', 'typescript', 'js', 'ts', 'jsx', 'tsx']
// })
// const codeToHtml = (str, lang) =>
// 	highlighter.codeToHtml(str, {
// 		lang,
// 		themes: {
// 			light: 'one-light',
// 			dark: 'one-dark-pro'
// 		}
// 	})
export const generateMetadata = async ({ params, searchParams: _searchParams }, _parent) => {
	const slug = params.slug

	return {
		title: slug
	}
}
const BlogDetailPage = async ({ params }) => {
	const blogPostContentResponse = await getBlogContent(params.slug)
	return (
		<main className={clsx('flex-fill-container', 'bg-white')}>
			<div className={clsx('content')}>
				<pre>{JSON.stringify(blogPostContentResponse.data.html, null, ' ')}</pre>
				<div
					dangerouslySetInnerHTML={{
						__html: blogPostContentResponse?.data?.html
					}}
				/>
			</div>
		</main>
	)
}
export default BlogDetailPage
