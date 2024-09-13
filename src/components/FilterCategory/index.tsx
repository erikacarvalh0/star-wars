import React from "react"
import classNames from "classnames"

import { getId } from "../../utils/getId.ts"

import { useFilterCategory } from "./hook.ts"
import "./index.scss"

export const FilterCategory = ({ items, groupName, title, state, categoryOpenState }) => {
	const { toggleList, handleChange, categoryOpen, currentSelected } = useFilterCategory({ state, categoryOpenState, groupName })

	return ( 
		<section className="filter-category">
			<button onClick={toggleList} className={classNames("filter-category__title", { "open": categoryOpen === groupName })}> {title} {currentSelected[groupName] && `(${currentSelected[groupName].length})` } </button>
			<ul className={classNames("filter-category__list", { "open": categoryOpen === groupName  })}>
				{items?.map((item, key) => {
					const { name, url } = item
					const id = getId(url)
					
					return (
						<li className="filter-category__list-item" key={`${key}-${id}`}>
							<input className="filter-category__input" onChange={handleChange} type="checkbox" id={`${groupName}-${id}`} name={groupName} />
							<label className="filter-category__label" htmlFor={`${groupName}-${id}`}>{ name } </label>
						</li>
					)
				}) }
			</ul>
		</section> 
	)
}