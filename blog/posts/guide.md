# Head 1
## Head 2
### Head 3
#### Head 4
##### Head 5

normal

**bold**

*italic*

~one~ or ~~two~~ tildes

text<sub>sub</sub>

text<sup>sup</sup>

> quote

`code`

`#ffffff` white

This site was built using [Next.js](https://nextjs.org/)

![Screenshot of a comment on a GitHub issue showing an image, added in the Markdown, of an Octocat smiling and raising a tentacle.](https://myoctocat.com/assets/images/base-octocat.svg)

- George Washington
* John Adams
+ Thomas Jefferson

1. James Madison
2. James Monroe
3. John Quincy Adams


1. First list item
   - First nested list item
     - Second nested list item

* [ ] to do
* [x] done

> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.


| a | b  |  c |  d  |
| - | :- | -: | :-: |
| 1 | 2 | 3 | 4 |


```jsx
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
		template: '%s | Title',
		default: 'Title'
	},
	description: 'Lorem Ipsum'
}

const RootLayout = ({ children }) => {
	return (
		<html lang="en">
			<body className={font.className}>{children}</body>
		</html>
	)
}
export default RootLayout

```
