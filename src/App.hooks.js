import { useReducer, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'



export const useItinerary = () => {

	const addNewItinerary = (itinerary) => {
		console.log(itinerary)
		return {
			id: uuidv4(),
			events: [],
			airline: '',
			flightNum: '',
			startDate: '',
			endDate: '',
			...itinerary
		}
	}

	const removeItinerary = (currentItList, id) => {
		return currentItList.filter(it => it.id !== id)
	}

	const editItinerary = (currentItList, editedIt) => {
		const tempList = currentItList
		const objIndex = currentItList.findIndex((obj => obj.id === editedIt.id))
		tempList[objIndex] = editedIt
		return tempList
	}

	const reducer = (state, action) => {
		switch (action.type) {
		case ITINERARY_ADD:
			var newIt = addNewItinerary(action.itinerary)
			return [...state, newIt]
		case ITINERARY_REMOVE:
			return removeItinerary(state, action.id)
		case ITINERARY_EDIT:
			return editItinerary(state, action.itinerary)
		default:
			throw new Error(`Invalid Action '${action.type}' Provided`)
		}
	}

	const [itineraries, dispatch] = useReducer(reducer, [])

	// TODO - remove this test data
	useEffect(() => {
		if (itineraries.length === 0) {
			dispatch({type: ITINERARY_ADD, itinerary: {endDate: '2022-10-31', startDate: '2022-09-26', tripName: 'Test Trip'}})
		}
	}, [])

	return {
		itineraries,
		dispatch
	}
}

export const ITINERARY_ADD = 'ADD'
export const ITINERARY_EDIT = 'EDIT'
export const ITINERARY_REMOVE = 'REMOVE'
