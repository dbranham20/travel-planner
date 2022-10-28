import React, { useState } from 'react'
import {
	Input,
	DrawerBody,
	DrawerHeader,
	DrawerCloseButton,
	DrawerContent,
	DrawerOverlay,
	DrawerFooter,
	Button,
	Drawer,
	Box,
	HStack,
	Heading,
	VStack,
	Divider,
	Center,
	Select
} from '@chakra-ui/react'
import { format } from 'date-fns'
import PropTypes from 'prop-types'
import { useAirlines, useEvents, EVENTS_ADD, EVENTS_EDIT, EVENTS_REMOVE } from './hooks'
import EventInputs from './components/event-inputs'
import { ITINERARY_EDIT } from '../App.hooks'

const EditItinerary = ({ itinerary, isOpen, onClose, dispatch }) => {
	const { airlines } = useAirlines()
	const { events, eventsDispatch } = useEvents()
	const [airline, setAirline] = useState(itinerary.airline || '')
	const [flightNum, setFlightNum] = useState(itinerary.flightNum || '')

	const btnRef = React.useRef()

	const dateFormat = (date) => {
		return format(new Date(date), 'MMMM, do yyyy')
	}

	const handleEditItinerary = () => {
		dispatch({type: ITINERARY_EDIT, itinerary: {...itinerary, events: events, airline, flightNum}})
		onClose()
	}

	return (
		<>
			<Drawer
				key={itinerary.id}
				id={itinerary.tripName}
				size='sm'
				isOpen={isOpen}
				placement='right'
				onClose={onClose}
				finalFocusRef={btnRef}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Details for <i>{itinerary.tripName}</i></DrawerHeader>
					<Box w='100%' display='flex' justifyContent='flex-start' paddingLeft='1.5rem'>
						<h4>{dateFormat(itinerary?.startDate)} - {dateFormat(itinerary?.endDate)}</h4>
					</Box>
					<HStack width='90%' display='flex' justifyContent='space-around' paddingTop='1rem' paddingLeft='1rem'>
						<VStack>
							<Select variant='outline' placeholder='Airline' focusBorderColor='purple' onChange={(option => setAirline(option.target.value))} selection={airline}>
								{
									airlines && airlines.map((a) => (
										<option key={a.id} value={a.id}>{a.name}</option>
									))
								}
							</Select>
						</VStack>
						<VStack>
							<Input variant='outline' placeholder='Flight Number' focusBorderColor='purple' onChange={(input) => setFlightNum(input.target.value)} value={flightNum} />
						</VStack>
					</HStack>
					<Divider paddingTop='1rem'/>
					<DrawerBody>
						<Heading display='flex' justifyContent='center' paddingTop='2rem' size='md'>Trip Timeline</Heading>
						<VStack paddingTop='1rem'>
							{
								events && events.map((e, index) => (
									<VStack key={e.id}>
										<EventInputs event={e} setEvent={(editedEvent) => eventsDispatch({type: EVENTS_EDIT, event: editedEvent})} removeEvent={(id) => eventsDispatch({type: EVENTS_REMOVE, id: id })}/>
										{
											index !== events.length - 1 &&
                        <Center height='50px'>
                        	<Divider  orientation='vertical' />
                        </Center>
										}
									</VStack>
								))
							}
						</VStack>
						<HStack paddingTop='3rem' justifyContent='space-around'>
							<Button size='sm' colorScheme='purple' onClick={() => eventsDispatch({type: EVENTS_ADD})}>
								Add Event
							</Button>
							{/* Add Event
							</Button> */}
							{/* <Button color='red' onClick={() => eventsDispatch({type: EVENTS_REMOVE, id: events.length})}>
								Remove Event
							</Button> */}
						</HStack>
					</DrawerBody>

					<DrawerFooter>
						<Button variant='outline' mr={3} onClick={onClose}>
              Cancel
						</Button>
						<Button colorScheme='purple' onClick={() => handleEditItinerary()}>
							Save
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	)
}

EditItinerary.propTypes = {
	itinerary: PropTypes.object, 
	isOpen: PropTypes.bool, 
	onClose: PropTypes.func,
	dispatch: PropTypes.func
}

export default EditItinerary