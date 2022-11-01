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

export const useEvents = (currentEvents) => {
	const [eventNum, setEventNum] = useState(0)
	const [events, setEvents] = useState(currentEvents)

	const addEvent = () => {
		setEventNum((num) => num + 1)
		setEvents((events) => [...events, 
			{
				id: eventNum,
				datetime: '',
				description: ''
			}
		])
	}

	const removeEvent = (id) => events.filter(it => it.id !== id)

	const editEvent = (editedEvent) => {
		const tempList = events
		const objIndex = events.findIndex((obj => obj.id === editedEvent.id))
		tempList[objIndex] = editedEvent
		setEvents(tempList)
	}


	// const reducer = (state, action) => {
	// 	switch (action.type) {
	// 	case EVENTS_ADD:
	// 		var newEvent = addEvent()
	// 		return [...state, newEvent]
	// 	case EVENTS_REMOVE:
	// 		return removeEvent(state, action.id)
	// 	case EVENTS_EDIT:
	// 		return editEvent(state, action.event)
	// 	default:
	// 		throw new Error(`Invalid Action '${action.type}' Provided`)
	// 	}
	// }
	// const [events, eventsDispatch] = useReducer(reducer, [])

	return {
		addEvent,
		removeEvent,
		editEvent,
		events
	}
}

export const EVENTS_ADD = 'ADD'
export const EVENTS_REMOVE = 'EDIT'
export const EVENTS_EDIT = 'REMOVE'