export const useAPI = () => {
	const genericGetter = (id, apiRoute, storage) => {
		const items = JSON.parse(localStorage.getItem(storage) || '{}')
		if (items?.[id]) {
			return new Promise((resolve) => resolve(items[id]))
		} else {
			const url = `${apiRoute}${id}`
			return fetch(url).then(response => response.json())
			.then((response) => {
				if(items) {
					const newItems = {
						...items,
						[id]: response?.data || response
					}
					localStorage.setItem(storage, JSON.stringify(newItems))
				}
				console.log(storage, response)
				return response?.data || response
			}).catch(error => {
				if (error.response) {
					console.log(`[ERROR] - ${id} falhou. ${error.response.data}` )
				}
	 		})  
		}
	}
	
	const getAllPeople =  (page: number = 1) => {
		const url = `https://swapi.dev/api/people/?page=${page}`
		return fetch(url).then(res => res.json()).then((response) => response.results)
	}
	
	const getPlanet =  (id: string) => {
		const url = `https://swapi.dev/api/planets/`
		return genericGetter(id, url, 'planets')
	}

	const getAll =  (type: string) => {
		const items = JSON.parse(localStorage.getItem(type) || '{}')
		if (Object.keys(items).length) {
			return new Promise((resolve) => resolve(items))
		} else {
			const url = `https://swapi.dev/api/${type}/`
			return fetch(url).then(res => res.json()).then((response) => {
				
				localStorage.setItem(type, JSON.stringify(response.results))
				
				return response.results
			})
		}
	}

	const getImage = (name: string) => {
		const url = `https://starwars-databank-server.vercel.app/api/v1/characters/name/`
		return genericGetter(name, url, 'images').then((res) => res?.[0]?.image)
	}

	const searchPeople = (name: string, page: number = 1) => {
		const url = `https://swapi.dev/api/people/?search=${name}`
		return fetch(url).then(res => res.json()).then((response) => response?.results)
	}
	
	return {
		getAllPeople,
		getPlanet,
		getAll,
		getImage,
		searchPeople
	}
}