import { iState } from "../../interfaces"

interface iFilterHook {
	state: iState,
	categoryOpenState: iState,
	groupName: string
}

export const useFilterCategory = ( { state, categoryOpenState, groupName } : iFilterHook) => {
	const [ currentSelected, setCurrentSelected ] = state
	const [ categoryOpen, setCategoryOpen ] = categoryOpenState
	
	const toggleList = () => {
		if (categoryOpen === groupName) {
			setCategoryOpen('')
		} else {
			setCategoryOpen(groupName)
		}
	}

	const handleChange = ({target}) => {
		const elmId = target.getAttribute('id')
		const [ type, id ] = elmId.split('-')
		
		if (currentSelected?.[type]) {
			if (!currentSelected?.[type].includes(id)) {
				setCurrentSelected({
					...currentSelected,
					[type]: [...currentSelected[type], id]
				})
			}
		} else {
			setCurrentSelected({
				...currentSelected,
				[type]: [id]
			})
		}
	}

	return {
		toggleList,
		handleChange, 
		categoryOpen,
		currentSelected
	}
}