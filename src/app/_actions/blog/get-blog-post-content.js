'use server'
import matter from 'gray-matter'
import { remark } from 'remark'

// import comments from 'remark-comments'
import gfm from 'remark-gfm'
import html from 'remark-html'

// import remarkPrism from 'remark-prism'
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
function transformContent(content, codeBlocks) {
	// Split the content by the placeholders
	// const regex = new RegExp('<p><code>[^<]+<\\/code>\\s*<code>##code\\[\\d+\\]##<\\/code><\\/p>', 'g')
	// const parts = content.split(/(<p><code>##code\[\d+\]##<\/code><\/p>)/g)
	const parts = content.split(/(<p><code>##code\[\d+\]##<\/code><\/p>)/g)
	const result = []
	let codeIndex = 0

	parts.forEach((part) => {
		const match = part.match(/<p><code>##code\[(\d+)\]##<\/code><\/p>/)
		if (match) {
			// If it's a placeholder, replace with corresponding code block
			result.push({ type: 'code', content: codeBlocks[codeIndex] })
			codeIndex++
		} else {
			// Otherwise, treat it as HTML content
			if (part.trim()) {
				result.push({ type: 'html', content: part })
			}
		}
	})

	return result
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

		const fileData = await response.json()
		const content = Buffer.from(fileData.content, 'base64').toString('utf8')
		const metadata = extractMetadata(content) ?? { title: '' }
		const matterResult = matter(content)
		const codeBlocks = []
		const codeRegex = new RegExp('`([^`]+)`\\s+```(\\w+)\\s+([\\s\\S]*?)\\s+```', 'g')
		const output = matterResult.content.replace(codeRegex, (match, filePath, language, code, index) => {
			codeBlocks.push({ filePath, language, code })
			return `\`##code[${codeBlocks.length - 1}]##\``
		})

		const processedContent = await remark()
			.use(html, { sanitize: { attributes: { '*': ['style', 'className', 'disabled', 'readonly'] } } })
			.use(gfm)
			// .use(html, { sanitize: false })
			// .use(remarkPrism)
			.process(output)

		const contentHtml = processedContent.toString()
		const result = transformContent(contentHtml, codeBlocks)

		return {
			status: response.status,
			message: `success`,
			data: {
				contentHtml: result,
				metadata,
				raw: output,
				...matterResult.data
			}
		}
	} catch (error) {
		console.error(error)
		return { status: 500, message: 'server error' }
	}
}
