const toKebabCase = (string) => {
	return String(string)
		.trim()
		.toUpperCase()
		.replace(/[^a-z0-9\s]/g, '')
		.replace(/\s+/g, '-')
}

export default toKebabCase
