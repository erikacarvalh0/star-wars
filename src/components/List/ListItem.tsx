import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { useAPI } from '../../services/useAPI.ts'

export const ListItem = ({ char, toggleModal } ) => {
	const { getImage } = useAPI()
	const [ image, setImage ] = useState('')
	const [ isLoading, setIsLoading ] = useState(true)

	useEffect(() => {
		getImage(char.name).then(res => {
			setImage(res)
			setIsLoading(false)
		})
	}, [char])

	return  (
		<button 
			className="list__item"
			onClick={() => toggleModal(char)} 
		>
			<div aria-roledescription='image' 
				className={classNames("list__item-img", { 'default': !image } )}
				style={{backgroundImage: isLoading ? '' : `url(${image || `assets/logo.svg`})`, backgroundColor: isLoading ? 'black' : ''}} 
			/>
			<p className="list__item-txt">{char.name}</p>
		</button>
	)
}
