export const GET = async (_request, { params: { slug } }) => {
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
		return Response.json({
			slug,
			status: response.status,
			data: {
				content
			}
		})
	} catch (error) {
		console.error(error)
		return { status: 500, message: 'server error', detail: JSON.stringify(error) }
	}
}
