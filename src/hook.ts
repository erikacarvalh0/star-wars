import { useEffect, useState } from "react";
import { iObject } from "./interfaces";

export const useApp = () => {
	const filtersState = useState<iObject>({})
	const allPeopleState = useState<iObject[]>([]);
	const listedPeopleState = useState<iObject[]>([]);
	const isListLoadingState = useState<Boolean>(true);
	const currPageState = useState<Number>(1);
	const searchState = useState<String>('');

	const contextValue = { filtersState, allPeopleState, listedPeopleState, isListLoadingState, currPageState, searchState }
  
	const [ showSplash, setShowSplash ] = useState(true)
	const [ showPagination, setShowPagination ] = useState(false)
	const [ listedPeople ] = listedPeopleState
  
	useEffect(() => {
	  setTimeout(() => setShowSplash(false), 3100)
	}, [])
  
	useEffect(() => {
	  setShowPagination(!isListLoadingState[0] && listedPeople.length > 0)
	}, [listedPeople])
	
	return {
		contextValue,
		showSplash,
		showPagination
	}
}