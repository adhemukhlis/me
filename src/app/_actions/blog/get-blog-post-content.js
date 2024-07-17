'use server'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import remarkPrism from 'remark-prism'
const metadataRegex = /<!--\s*const metadata\s*=\s*({[\s\S]*?})\s*-->/
const extractMetadata = (content) => {
	const metadataMatch = content.match(metadataRegex)
	const metadataJson = metadataMatch?.[1]
	if (!!metadataJson) {
		var stringObj = metadataJson.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":').replace(/'/g, '"')
		return JSON.parse(stringObj)
	} else {
		return undefined
	}
}

export const getBlogContent = async (slug) => {
	const filePath = `blog/posts/${slug}.md`
	try {
		const response = await fetch(`https://api.github.com/repos/adhemukhlis/me/contents/${filePath}?ref=blog`, {
			headers: {
				Authorization: `token ${process.env.GITHUB_TOKEN}`,
				Accept: 'application/vnd.github.v3+json'
			},
			next: {
				revalidate: 10
			}
		})
		console.log('status : ', response.status)
		console.log('fileData : ', fileData)
		console.log('response : ', response)
		const fileData = await response.json()
		const content = Buffer.from(fileData.content, 'base64').toString('utf8')
		const metadata = extractMetadata(content)
		const matterResult = matter(content)
		const processedContent = await remark()
			.use(html, { sanitize: { attributes: { '*': ['style', 'className', 'disabled', 'readonly'] } } })
			// .use(html, { sanitize: false })
			.use(remarkPrism)
			.process(matterResult.content)

		const contentHtml = processedContent.toString()
		return { status: response.status, message: `success`, data: { contentHtml, metadata, ...matterResult.data } }
	} catch (error) {
		console.error(error)
		return { status: 500, message: 'server error' }
	}
}
