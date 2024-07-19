'use client'

import { useState } from 'react'
import { IconLightCheck, IconLightClone } from '@/components/icons'

let doneTimeout = undefined
const ButtonCopy = ({ value }) => {
	const [done, setDone] = useState(false)
	const handleCopy = async () => {
		clearTimeout(doneTimeout)
		await navigator.clipboard.writeText(String(value))
		setDone(true)
		doneTimeout = setTimeout(() => {
			setDone(false)
		}, 1600)
	}
	return (
		<button onClick={handleCopy} className="copy-button">
			{done ? (
				<IconLightCheck style={{ width: '1rem', aspectRatio: '1/1', fill: '#333' }} />
			) : (
				<IconLightClone style={{ width: '1rem', aspectRatio: '1/1', fill: '#333' }} />
			)}
		</button>
	)
}
export default ButtonCopy
