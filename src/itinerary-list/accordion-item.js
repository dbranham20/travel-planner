import React, { useEffect } from 'react'
import {
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Box,
	Button,
	useDisclosure
} from '@chakra-ui/react'
import { format } from 'date-fns'
import PropTypes from 'prop-types'
import EditItinerary from '../edit-itinerary'
import {  ITINERARY_REMOVE } from '../App.hooks'

const WrappedAccordionItem = ({ dispatch, itinerary, id }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()

	const dateFormat = (startDate, endDate) => {
		const startDateObj = new Date(startDate)
		const endDateObj = new Date(endDate)

		if ((startDateObj.getMonth() === endDateObj.getMonth()) && (startDateObj.getFullYear() === endDateObj.getFullYear())){
			return `${format(startDateObj, 'MMMM yyyy')}`
		} else {
			return `${format(startDateObj, 'MMMM yyyy')} - ${format(endDateObj, 'MMMM yyyy')}`
		}
	}

	return (
		<AccordionItem key={id}>
			<h2>
				<AccordionButton>
					<Box w='100%' display='flex' justifyContent='flex-start'>
						<strong>{itinerary.tripName}</strong>
					</Box>
					<Box w='100%' display='flex' justifyContent='flex-end'>
						{dateFormat(itinerary?.startDate, itinerary?.endDate)}
					</Box>
					<AccordionIcon />
				</AccordionButton>
			</h2>
			<AccordionPanel pb={4}>
				<EditItinerary 
					key={id} 
					itinerary={itinerary} 
					isOpen={isOpen} 
					onClose={onClose}
					dispatch={dispatch}
				/>
				<Box display='flex' justifyContent='flex-end'>
					<i>{itinerary.events.length} events</i>
					<Button marginLeft='1rem' marginRight='1rem' size='sm' colorScheme='purple' onClick={onOpen} >
						{itinerary.events.length > 0 ? 'Edit Details' : 'Add Details' }
					</Button>
					<Button size='sm' variant='outline' colorScheme='red' onClick={() => dispatch({type: ITINERARY_REMOVE, id: id})}>
            Delete
					</Button>
				</Box>
			</AccordionPanel>
		</AccordionItem>
	)
}

WrappedAccordionItem.propTypes = {
	dispatch: PropTypes.func,
	itinerary: PropTypes.object,
	id: PropTypes.string
}

export default WrappedAccordionItem