import React from 'react'

import { FilterCategory } from '../FilterCategory/index.tsx'
import FilterIcon from "../icons/Filter.tsx"

import { useFilter } from './hook.ts'
import './index.scss'


export const Filter = () => {
	const {
		homeworld,
		starships,
		species,
		disableButton,
		handleFilter,
		currSelectedState,
		categoryOpenState
    } = useFilter()
 
	return (<section className="filter__container">
		<h2>Filter by </h2>
		{!!homeworld.length && <FilterCategory categoryOpenState={categoryOpenState} state={currSelectedState} items={homeworld} groupName="homeworld" title="Homeworld"/>}
		{!!starships.length && <FilterCategory categoryOpenState={categoryOpenState} state={currSelectedState} items={starships} groupName="starships" title="Starships"/>}
		{!!species.length && <FilterCategory categoryOpenState={categoryOpenState} state={currSelectedState} items={species} groupName="species" title="Species"/>}
		<button disabled={disableButton} className="filter__send" onClick={handleFilter}> Filter <FilterIcon /> </button>
	</section>
	)
}