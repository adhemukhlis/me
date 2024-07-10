import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import mdx from 'remark-mdx'
// import remarkPrism from 'remark-prism'
async function fetchFileContent(filePath) {
	const fileUrl = `https://api.github.com/repos/adhemukhlis/me/contents/${filePath}?ref=blog`
	const response = await fetch(fileUrl, {
		headers: {
			Accept: 'application/vnd.github.v3+json'
		},
		cache: 'no-store'
	})
	if (!response.ok) {
		throw new Error(`Failed to retrieve file content: ${response.status} - ${response.statusText}`)
	}
	const fileData = await response.json()
	const content = Buffer.from(fileData.content, 'base64').toString('utf8')
	return content
}
export const GET = async (_request, { params }) => {
	const filePath = `blog/posts/${params.file_name}.md`
	const content = await fetchFileContent(filePath)
	try {
		const matterResult = matter(content)
		// const processedContent = await remark()
		// 	.use(html, { sanitize: { attributes: { '*': ['style', 'class', 'disabled', 'readonly'] } } })
		// 	// .use(remarkPrism)
		// 	.process(matterResult.content)
		const processedContent = await remark()
			.use(html, { sanitize: { attributes: { '*': ['style', 'class', 'disabled', 'readonly'] } } })
			.use(mdx)
			// .use(remarkPrism)
			.process(matterResult.content)
		const test = remark().use(mdx).parse(matterResult.content)
		const meta = test.children.find((obj) => obj.value.includes('const meta'))
		var stringMeta = meta.value.slice(meta.value.indexOf('=') + 1)
		var stringObj = stringMeta.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":').replace(/'/g, '"')
		const _meta = JSON.parse(stringObj)
		const contentHtml = processedContent.toString()
		return new Response(
			JSON.stringify({
				status: 200,
				message: `success`,
				data: {
					meta: _meta,
					content: contentHtml
				}
			}),
			{
				status: 200,
				headers: { 'content-type': 'application/json' }
			}
		)
	} catch (error) {
		return new Response(JSON.stringify({ status: 500, message: `Internal Server Error ${error}` }), {
			status: 500,
			headers: { 'content-type': 'application/json' }
		})
	}
}
