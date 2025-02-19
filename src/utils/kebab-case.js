const toKebabCase = (string) => {
	return String(string)
		.trim() // Remove leading/trailing spaces
		.toLowerCase() // Convert to lowercase
		.replace(/[^a-z0-9\s]/g, '') // Remove non-alphanumeric except spaces
		.replace(/\s+/g, '-') // Convert spaces to hyphens
		.replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
		.toUpperCase() // set Uppercase
}

export default toKebabCase
