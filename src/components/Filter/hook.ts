import { useContext, useEffect, useState } from "react";

import { filterPeople } from "../../utils/filterPeople.ts";
import { useAPI } from "../../services/useAPI.ts";
import { MainContext } from "../../context/index.tsx";

export const useFilter = () => {
	const { filtersState, listedPeopleState, allPeopleState } = useContext(MainContext)
	const [ selected, setSelected ] = filtersState
	const [ listedPeople, setListedPeople ] = listedPeopleState
	const [ allPeople ] = allPeopleState
	const [ currSelected, setCurrSelected ] = useState({})
  const [ homeworld, setHomeworld ] = useState([]);
  const [ starships, setStarships ] = useState([]);
  const [ species, setSpecies ] = useState([]);
  const [ categoryOpen, setCategoryOpen ] = useState('')
  const [ disableButton, setDisableButton ] = useState(true)
  const { getAll } = useAPI();

  useEffect(() => {
    getAll('planets').then(res => setHomeworld(res));
    getAll('starships').then(res => setStarships(res));
    getAll('species').then(res => setSpecies(res));
  }, [])

  useEffect(() => setDisableButton(!Object.keys(currSelected).length), [currSelected])


  useEffect(() => {
    const filterKeys = Object.keys(selected)
    let filteredPeople = listedPeople

    if (filterKeys.length) {
      filteredPeople = filterPeople(listedPeople, selected)
      setListedPeople(filteredPeople)
    } else {
      setListedPeople(allPeople)
    }
  }, [selected])

  const handleFilter = () => {
    setSelected(currSelected)
    setCategoryOpen('')
  }

    return {
      homeworld,
      starships,
      species,
      disableButton,
      handleFilter,
      currSelectedState: [ currSelected, setCurrSelected ],
      categoryOpenState: [ categoryOpen, setCategoryOpen ],
    }
}