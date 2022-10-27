import { useEffect, useState, useReducer } from 'react'
import airlinesJSON from './airlines.json'

export const useAirlines = () => {
	useEffect(() => {
		fetchAirlines()
	}, [])
	const [airlines, setAirlines] = useState([])

	const fetchAirlines = () => {
		setAirlines(airlinesJSON)
	}

	return {
		airlines
	}
}

export const useEvents = () => {
	const addEvent = (numEvents) => {
		return {
			id: numEvents,
			datetime: '',
			description: ''
		}
	}

	const removeEvent = (currentEventList, id) => {
		return currentEventList.filter(it => it.id !== id)

	}

	const editEvent = (currentEventList, editedEvent) => {
		const tempList = currentEventList
		const objIndex = currentEventList.findIndex((obj => obj.id === editedEvent.id))
		tempList[objIndex] = { ...tempList[objIndex], ...editedEvent }
		return tempList
	}


	const reducer = (state, action) => {
		switch (action.type) {
		case EVENTS_ADD:
			var newEvent = addEvent(action.numEvents)
			return [...state, newEvent]
		case EVENTS_REMOVE:
			return removeEvent(state, action.id)
		case EVENTS_EDIT:
			return editEvent(state, action.event)
		default:
			throw new Error(`Invalid Action '${action.type}' Provided`)
		}
	}
	const [events, eventsDispatch] = useReducer(reducer, [])

	return {
		eventsDispatch,
		events
	}
}

export const EVENTS_ADD = 'ADD'
export const EVENTS_REMOVE = 'EDIT'
export const EVENTS_EDIT = 'REMOVE'