import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useAPI } from "../../services/useAPI.ts";
import { getId } from "../../utils/getId.ts";

interface iPlanet {
	climate: string,
	created: string,
	diameter: string,
	edited: string,
	films: string[],
	gravity: string,
	name: string,
	orbital_period: string,
	population: string,
	residents: string[],
	rotation_period: string,
	surface_water: string,
	terrain: string,
	url: string,
}

export const useModal = ({ character, isOpen, setIsOpen, toggleDialog }) => {
	const { getPlanet, getImage } = useAPI()
	const [planet, setPlanet] = useState<iPlanet>({} as iPlanet)	
	const dialogRef: MutableRefObject<HTMLDialogElement | null> = useRef(null);
	const [ image, setImage ] = useState('')

	useEffect(() => {
		if (isOpen) {
			dialogRef?.current?.showModal();
		} else {
			dialogRef?.current?.close();
		}
	}, [isOpen]);
	
	useEffect(() => {
		getImage(character.name).then(res => {
			setImage(res)
		})
		getPlanet(getId(character?.homeworld)).then((res) => setPlanet(res))
	}, [character])


	const closeDialog = () => {
		console.log('close')
		setIsOpen(false);
	}

    return {
        dialogRef,
		closeDialog,
		planet,
		image
    }
}