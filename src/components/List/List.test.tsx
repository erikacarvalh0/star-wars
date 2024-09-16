import React, { act } from 'react'
import '@testing-library/jest-dom'
import {fireEvent, render, RenderOptions, screen, waitFor} from '@testing-library/react'

import { mockedAllPeople, mockedChar, mockedGetter, mockedPlanet, mockImageResponse } from "../mocks/index.ts"

import { ListItem  } from './ListItem.tsx'
import { Modal  } from '../Modal/index.tsx'
import * as hooks from '../../services/useAPI.ts';

let isOpen = false
const setIsOpen = (state) => isOpen = state
let selectedChar = mockedChar

const toggleModal = (char) => {
	isOpen = !isOpen
	selectedChar = char
}

let container = {querySelector: (param: string) => {return {} as any} }

beforeAll(() => {
	HTMLDialogElement.prototype.show = jest.fn();
	HTMLDialogElement.prototype.showModal = jest.fn();
	HTMLDialogElement.prototype.close = jest.fn();
    
	jest.mock('../../services/useAPI', () => ({
		useAPI: () => {
            const genericGetter = jest.fn().mockResolvedValue(mockedGetter)
			const getImage = jest.fn().mockResolvedValue(mockImageResponse)
            const getAllPeople = jest.fn().mockResolvedValue(mockedAllPeople)
            const getPlanet = jest.fn().mockResolvedValue(mockedPlanet)
            const getAll = jest.fn().mockResolvedValue(mockedAllPeople)
            const searchPeople = jest.fn().mockResolvedValue(mockedAllPeople)
			return [300, 200, { 
                getAllPeople,
                getPlanet,
                getAll,
                getImage,
                searchPeople
             }]
		}
	}));
});

beforeEach(async () => {
	jest.spyOn(hooks, 'useAPI').mockImplementation(() => ({
        genericGetter: jest.fn().mockResolvedValue(mockedGetter),
        getImage: jest.fn().mockResolvedValue(mockImageResponse),
        getAllPeople: jest.fn().mockResolvedValue(mockedAllPeople),
        getPlanet: jest.fn().mockResolvedValue(mockedPlanet),
        getAll: jest.fn().mockResolvedValue(mockedAllPeople),
        searchPeople: jest.fn().mockResolvedValue(mockedAllPeople),
    }));
	const view = await waitFor(() => render(<ListItem char={mockedChar} toggleModal={toggleModal} />))
	container = view.container
})

describe('Display and interact with characters list', () => {
	it('should render ListItem component with character name', async () => {
		const listItem = screen.queryByRole('button')
		expect(listItem).toHaveTextContent(mockedChar.name)
	})

	it('should toggle isOpen when click on ListItem button', async () => {
		const button = container?.querySelector('button')


		if (button) {
			const prevOpenStatus = isOpen
			fireEvent.click(button)
			expect(isOpen).toBe(!prevOpenStatus)
		}
	})

	it('should open modal and display character name', async () => {
		const { container: modalContainer } = await waitFor (() => render(<Modal 
            setIsOpen={setIsOpen}
            character={selectedChar}
            isOpen={isOpen}
            toggleDialog={toggleModal}
		  />))
		
		const title = modalContainer.querySelector('h1')

		expect(title).toHaveTextContent(mockedChar.name)
	})

})