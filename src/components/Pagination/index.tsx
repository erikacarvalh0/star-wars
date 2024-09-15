import React, { useContext, useEffect, useState } from 'react'

import { FilterCategory } from '../FilterCategory/index.tsx'
import FilterIcon from "../icons/Filter.tsx"

import { useSearch } from './hook.ts'
import './index.scss'
import { MainContext } from '../../context/index.tsx'
import { useAPI } from '../../services/useAPI.ts'
import { filterPeople } from '../../utils/filterPeople.ts'
import classNames from 'classnames'


export const Pagination = () => {
	const { handlePagination, isLoadingMore } = useSearch()
 
	return (<button className={classNames("pagination", {'loading': isLoadingMore})} onClick={handlePagination}>See more</button>
	)
}