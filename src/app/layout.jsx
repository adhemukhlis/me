import { Noto_Serif } from 'next/font/google'
import '@/styles/globals.scss'

const font = Noto_Serif({
	style: ['normal', 'italic'],
	weight: ['400', '700'],
	subsets: ['latin'],
	display: 'swap'
})

export const metadata = {
	title: {
		template: '%s | Mukhlis Adhe',
		default: 'Mukhlis Adhe'
	},
	description: 'Portfolio Mukhlis Adhe Purwanto'
}

const RootLayout = ({ children }) => {
	return (
		<html lang="en">
			<body className={font.className}>{children}</body>
		</html>
	)
}
export default RootLayout
