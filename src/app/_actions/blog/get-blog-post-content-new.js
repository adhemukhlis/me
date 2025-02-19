'use server'
import matter from 'gray-matter'
import { remark } from 'remark'
import { visit } from 'unist-util-visit'
import { toString } from 'hast-util-to-string'
import { u } from 'unist-builder'
import rehypeParse from 'rehype-parse'

// import comments from 'remark-comments'

import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeSanitize from 'rehype-sanitize'
// import rehypeShiki from 'rehype-shiki'
import { createHighlighter, codeToHast } from 'shiki'

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
function codeLanguage(node) {
	const className = node.properties.className || []
	var value

	for (const element of className) {
		value = element

		if (value.slice(0, 9) === 'language-') {
			return value.slice(9)
		}
	}

	return null
}
function tokensToHast(lines) {
	let tree = []

	for (const line of lines) {
		if (line.length === 0) {
			tree.push(u('text', '\n'))
		} else {
			for (const token of line) {
				tree.push(
					u(
						'element',
						{
							tagName: 'span',
							properties: { style: 'color: ' + token.color }
						},
						[u('text', token.content)]
					)
				)
			}

			tree.push(u('text', '\n'))
		}
	}

	// Remove the last \n
	tree.pop()

	return tree
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
		const matterResult = matter(content)

		const highlighter = await createHighlighter({
			themes: ['one-light'],
			langs: ['javascript', 'typescript', 'js', 'ts', 'jsx', 'tsx']
		})
		// let shikiTheme = shiki.getTheme('one-dark-pro')
		const result = await unified()
			.use(remarkParse) // parse markdown into AST
			.use(remarkGfm) // support GitHub Flavored Markdown
			.use(remarkRehype, { allowDangerousHtml: true }) // transform remark AST to rehype AST
			// .use(rehypeShiki, { highlighter }) change this
			.use(() => {
				return async function transformer(tree) {
					visit(tree, 'element', async (node, index, parent) => {
						if (!parent || parent.tagName !== 'pre' || node.tagName !== 'code') {
							return
						}
						const lang = codeLanguage(node)
						const codeHtml = highlighter.codeToHtml(toString(node), {
							lang,
							themes: {
								light: 'one-light'
							}
						})
						// console.log(codeHtml)
						const tokens = await codeToHast(toString(node), {
							lang,
							theme: 'one-light'
						})

						const { children } = unified().use(rehypeParse, { fragment: true }).parse(codeHtml)

						// const tree = tokensToHast(tokens)
						console.log(JSON.stringify(children, null, '\t'))
						node.children = children

						// Convert the code block to highlighted HTML
						// const html = highlighter.codeToHtml(code, {
						// 	lang,
						// 	themes: {
						// 		light: 'one-light',
						// 		dark: 'one-dark-pro'
						// 	}
						// })

						// Transform the Markdown AST node to an "html" node
						// so remark-rehype recognizes it as raw HTML later.
						// node.type = 'html'
						// node.value = html

						// Replace the old "code" node in the parent's children
						// if (parent && Array.isArray(parent.children)) {
						// 	parent.children[index] = node
						// }
					})
				}
			})
			// .use(rehypeSanitize) // sanitize HTML for security
			.use(rehypeStringify, { allowDangerousHtml: true }) // convert rehype AST to string HTML
			.process(matterResult.content)

		const html = result.toString()
		return {
			status: response.status,
			message: `success`,
			data: {
				html
			}
		}
	} catch (error) {
		console.error(error)
		return { status: 500, message: 'server error' }
	}
}
