import clsx from 'clsx'
import { Noto_Serif, Nunito_Sans } from 'next/font/google'
import '@/styles/globals.scss'
import cv from '@/content/cv'
// import '@/styles/prismjs.css'

const font = Noto_Serif({
	style: ['normal', 'italic'],
	weight: ['400', '700'],
	subsets: ['latin'],
	display: 'swap',
	adjustFontFallback: false
})
const fontUI = Nunito_Sans({
	style: ['normal', 'italic'],
	weight: ['400', '700'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-ui',
	adjustFontFallback: false
})

export const metadata = {
	title: {
		template: `%s | ${cv.full_name}`,
		default: cv.full_name
	},
	description: `${cv.full_name} | ${cv.summary}`,
	twitter: {
		card: 'summary_large_image',
		description: cv.summary,
		title: cv.full_name,
		// images: `https://www.altaprima.com/_assets/logo/ap-logo.png`,
		site: 'adhemukhlis.vercel.app'
	},
	openGraph: {
		url: "https://www.adhemukhlis.vercel.app/about",
		type: 'website',
		title: cv.full_name,
		description: cv.summary,
		// images: `https://www.altaprima.com/_assets/logo/ap-logo.png`
	}
}
export const viewport = {
	themeColor: '#FFFFFF'
}


const RootLayout = ({ children }) => {
	return (
		<html lang="en">
			<body className={clsx(font.className, fontUI.variable)}>{children}</body>
		</html>
	)
}
export default RootLayout
