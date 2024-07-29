'use server'
async function fetchFileCommits(filePath) {
	const commitsUrl = `https://api.github.com/repos/adhemukhlis/me/commits?path=${filePath}&sha=blog&per_page=1`
	const response = await fetch(commitsUrl, {
		headers: {
			Accept: 'application/vnd.github.v3+json'
		},
		next: {
			revalidate: 10
		}
	})
	if (!response.ok) {
		throw new Error(`Failed to retrieve commits: ${response.status} - ${response.statusText}`)
	}
	return response.json()
}
export const getBlogPosts = async () => {
	try {
		const posts = []
		const response = await fetch(`https://api.github.com/repos/adhemukhlis/me/contents/blog/posts?ref=blog`, {
			headers: {
				Accept: 'application/vnd.github.v3+json'
			},
			next: {
				revalidate: 10
			}
		})
		const data = await response.json()
		const mdFiles = data.filter((file) => file.name.endsWith('.md'))
		for (const file of mdFiles) {
			const filePath = `blog/posts/${file.name}`
			const commits = await fetchFileCommits(filePath)
			const updated_at = commits.length > 0 ? commits[0].commit.author.date : 'Unknown'
			posts.push({
				author: {
					username: commits[0].author.login,
					github_url: commits[0].author.html_url,
					avatar: commits[0].author.avatar_url
				},
				title: replaceDashes(file.name).slice(0, '.md'.length * -1),
				slug: String(file.path).slice('blog/posts/'.length, '.md'.length * -1),
				updated_at
			})
		}

		return { status: response.status, message: `success`, data: { posts } }
	} catch (error) {
		console.error(error)
		return { status: 500, message: 'server error' }
	}
}
function replaceDashes(input) {
	return (
		input
			// Replace single dashes with spaces, ensuring it ignores dash sequences
			.replace(/(?<!-)-(?!-)/g, ' ')
			// Remove the first dash in sequences of two or more
			.replace(/-{2,}/g, (match) => match.slice(1))
	)
}
