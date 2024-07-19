import clsx from 'clsx'
import { Noto_Serif, Nunito_Sans } from 'next/font/google'
import '@/styles/globals.scss'
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
		template: '%s | Mukhlis Adhe',
		default: 'Mukhlis Adhe'
	},
	description: 'Mukhlis Adhe Purwanto profile'
}

const RootLayout = ({ children }) => {
	return (
		<html lang="en">
			<body className={clsx(font.className, fontUI.variable)}>{children}</body>
		</html>
	)
}
export default RootLayout
