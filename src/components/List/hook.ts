import { useContext, useEffect, useState } from "react";

import { useAPI } from "../../services/useAPI.ts";
import { MainContext } from "../../context/index.tsx";

export const useList = () => {
  const { allPeopleState, listedPeopleState, isListLoadingState } = useContext(MainContext)
	const [ isOpen, setIsOpen ] = useState(false)
  const [ selectedChar, setSelectedChar ] = useState(undefined)
  const [ , setAllPeople ] = allPeopleState;
  const [ listedPeople, setListedPeople ] = listedPeopleState;
  const [ isListLoading, setIsListLoading ] = isListLoadingState;
  const { getAllPeople } = useAPI();
  
  const toggleModal = (char) => {
    setSelectedChar(char)
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    getAllPeople().then(res =>{
      setAllPeople(res)
      setListedPeople(res)
      setIsListLoading(false)
    });
  }, [])

    return {
      isOpen,
      setIsOpen,
      selectedChar,
      toggleModal,
      listedPeople,
      isListLoading
    }
}