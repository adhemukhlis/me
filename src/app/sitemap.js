const sitemap = () => {
	return [
		{
			url: 'https://www.adhemukhlis.vercel.app',
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1
		},
		{
			url: `https://www.adhemukhlis.vercel.app/about`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8
		}
	]
}

export default sitemap
