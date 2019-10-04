const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = (values /*, dispatch */) => {
	console.log('values', values)

	return sleep(1000).then(() => { // simulate server latency
		if (['john', 'paul', 'george', 'ringo'].includes(values.email)) {
			console.log('throw')

			throw { email: 'That username is taken' }
		}
	})
}

export default asyncValidate
