/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	experimental: {
		serverComponentsExternalPackages: ['pdfmake']
	}
	// images: {
	// 	remotePatterns: [
	// 		{
	// 			protocol: 'https',
	// 			hostname: 'api.dicebear.com'
	// 		}
	// 	],
	// dangerouslyAllowSVG: true
	// }
}

export default nextConfig
