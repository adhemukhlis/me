/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	experimental: {
		serverComponentsExternalPackages: ['pdfmake', 'remark-prism']
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com'
			}
		],
		dangerouslyAllowSVG: true
	}
}

export default nextConfig
