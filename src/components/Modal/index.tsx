import React, { Dispatch, SetStateAction } from 'react'
import classNames from 'classnames'

import { formatKg, formatMeters } from '../../utils/formatUnits.ts'

import { useModal } from './hook.ts'
import './index.scss'

interface iPerson {
	birth_year: string,
	created: string,
	edited: string,
	eye_color: string,
	films: string[],
	gender: string,
	hair_color: string,
	height: string,
	homeworld: string,
	mass: string,
	name: string,
	skin_color: string,
	species: string[],
	starships: string[],
	url: string,
	vehicles: string[],
	image?: string,
}

interface iModal {
	isOpen: boolean, 
	setIsOpen: Dispatch<SetStateAction<any>> ,
	toggleDialog: any, 
	character: iPerson,
}

export const Modal = ({ isOpen, setIsOpen, toggleDialog, character } : iModal) => {
	const { name, birth_year, gender, height, mass, films } = character
	const { dialogRef, closeDialog, planet, image } = useModal({ character, isOpen, setIsOpen, toggleDialog })
	return (
		<dialog ref={dialogRef} className={classNames("dialog", { hide: !isOpen })}>
			<button onClick={closeDialog} className="dialog__close" data-js="hideInfo"></button>
			<header>
				<h1>{name}</h1>
			</header>
			<main className="dialog__body">
				{image && <div 
					className="dialog__img" 
					style={{backgroundImage: 
						`url(${image})`}} aria-roledescription='image'
					/>}
				
				<ul className="dialog__list">
					{ height  && <li className="dialog__list-item"><strong>Height:</strong> { formatMeters(height)  }</li>}
					{ mass  && <li className="dialog__list-item"><strong>Mass:</strong> { formatKg(mass)  }</li>}
					{ gender  && <li className="dialog__list-item"><strong>Gender:</strong> { gender  }</li>}
					{ birth_year && <li className="dialog__list-item"><strong>Birth Year:</strong> { birth_year }</li>}
					{ films && <li className="dialog__list-item"><strong>Films:</strong> { films.length }</li>}
					{ planet?.name && <li className="dialog__list-item">
						<strong>Homeworld:</strong>
						<ul>
							<li  className="dialog__list-item"><strong>Name:</strong> { planet?.name  }</li>
							<li  className="dialog__list-item"><strong>Terrain:</strong> { planet?.terrain  }</li>
							<li  className="dialog__list-item"><strong>Climate:</strong> { planet?.climate  }</li>
							<li  className="dialog__list-item"><strong>Population:</strong> { planet?.population  }</li>
						</ul>
					</li>}
				</ul>
			</main>
		</dialog>
	)
}