const NotFound = () => {
	return (
		<div
			style={{
				display: 'flex',
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				gap: '1rem'
			}}>
			<h2>Not Found</h2>
			<p>Could not find requested URL</p>
		</div>
	)
}

export default NotFound
