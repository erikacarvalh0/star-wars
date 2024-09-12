import React from 'react'

import { Modal } from '../Modal/index.tsx'
import { ListItem } from './ListItem.tsx'

import LogoIcon from "../icons/Logo.tsx"

import { useList } from './hook.ts'
import './index.scss'


export const List = () => {
	const {
        isOpen,
		setIsOpen,
		selectedChar,
		listedPeople,
		toggleModal,
		isListLoading
    } = useList()
	
 
	return (<>
		<section className="list">
			{!isListLoading && listedPeople.map((char, key) => <ListItem key={key} char={char} toggleModal={toggleModal} />) }
			{isListLoading && <div className="list__loading-container">
				<LogoIcon className="list__loading" />
				<p className="list__loading-txt">Loading...</p>
			</div>}
		</section>
	
		  {selectedChar && <Modal 
			character={selectedChar}
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			toggleDialog={toggleModal}
		  />}
	</>
	)
}