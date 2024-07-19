/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	experimental: {
		serverComponentsExternalPackages: ['pdfmake', 'shiki']
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
