import React from 'react'

import SearchIcon from "../../components/icons/Search.tsx"

import { useSearch } from './hook.ts'
import './index.scss'


export const Search = () => {
	const {
		handleChange,
		handleSearch,
		searchVal
    } = useSearch()
 
	return (<form onSubmit={handleSearch} className="form">
		<input onChange={handleChange} className="form__text" type="text" name="search" />
		<button disabled={!searchVal} className="form__send" type="submit"><SearchIcon /></button>
	</form>
	)
}