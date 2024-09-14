import { useContext, useState } from "react";
import { useAPI } from "../../services/useAPI.ts";
import { MainContext } from "../../context/index.tsx";
import { filterPeople } from "../../utils/filterPeople.ts";

export const useSearch = () => {
  const { filtersState, isListLoadingState, allPeopleState, listedPeopleState, searchState } = useContext(MainContext)
  const { searchPeople, getAllPeople } = useAPI()
  const [ searchVal, setSearchVal ] = searchState
  const [ allPeople , setAllPeople ] = allPeopleState;
	const [ selectedFilters ] = filtersState
  const [ , setIsListLoading ] = isListLoadingState;
  const [ , setListedPeople ] = listedPeopleState;

  const handleChange = ({ target }) => {
    if (target.value) {
      setSearchVal(target.value)
    } else {
      setIsListLoading(true)
      getAllPeople().then(res =>{
        setAllPeople(res)
        filterAfterSearch(res)
        setIsListLoading(false)
      });
    }
  }

  const filterAfterSearch = (res) => {
    const filterKeys = Object.keys(selectedFilters)
    let filteredPeople = res

    if (filterKeys.length) {
      filteredPeople = filterPeople(res, selectedFilters)
      setListedPeople(filteredPeople)
    } else {
      setListedPeople(allPeople)
    }
  }
	

  const handleSearch = (e) => {
    e.preventDefault()
    setIsListLoading(true)

    searchPeople(searchVal).then(res => {
      setAllPeople(res)
      filterAfterSearch(res)
      setIsListLoading(false)
    })
  }

    return {
      handleSearch,
      handleChange,
      searchVal
    }
}