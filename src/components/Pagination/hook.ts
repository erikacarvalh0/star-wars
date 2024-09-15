import { useContext, useEffect, useState } from "react";
import { useAPI } from "../../services/useAPI.ts";
import { MainContext } from "../../context/index.tsx";
import { filterPeople } from "../../utils/filterPeople.ts";

export const useSearch = () => {
	const { currPageState, searchState, allPeopleState, filtersState, listedPeopleState } = useContext(MainContext)
	const [ currPage, setCurrPage ] = currPageState
	const { searchPeople, getAllPeople } = useAPI()
	const [ allPeople , setAllPeople ] = allPeopleState;
	const [ searchVal ] = searchState
	const [ selectedFilters ] = filtersState
	const [ , setListedPeople ] = listedPeopleState;
	const [ isLoadingMore, setIsLoadingMore ] = useState(false)

	const filterAfterSearch = (res) => {
	  const filterKeys = Object.keys(selectedFilters)
	  let filteredPeople = res
  
	  if (filterKeys.length) {
		filteredPeople = filterPeople(res, selectedFilters)
		setListedPeople(filteredPeople)
	  } else {
		  setListedPeople(res)
	  }
	}

	const handlePagination = () => {
		setCurrPage(currPage + 1)

		setIsLoadingMore(true)
		if (searchVal) {
			searchPeople(searchVal, currPage + 1).then(res => {
				setTimeout(() => {
					setAllPeople([...allPeople, ...res])
					filterAfterSearch([...allPeople, ...res])
					setIsLoadingMore(false)
			}, 500)
			  })
		} else {
			getAllPeople(currPage  + 1).then(res =>{
				setTimeout(() => {
					setAllPeople([...allPeople, ...res])
					filterAfterSearch([...allPeople, ...res])
					setIsLoadingMore(false)
			}, 500)
			  });
		}
	}

    return {
      handlePagination,
      isLoadingMore
    }
}