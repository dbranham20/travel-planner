import React from 'react'
import {
	Accordion
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import WrappedAccordionItem from './accordion-item'


export const ItineraryList = ({ dispatch, itineraries }) => {
	console.log(itineraries)
	return (
		<Accordion minW='40%' allowToggle>
			{
				itineraries && itineraries.map((it) => (
					<WrappedAccordionItem dispatch={dispatch} itinerary={it} key={it.id} id={it.id}  />
				))
			}
		</Accordion>
	)
}

ItineraryList.propTypes = {
	itineraries: PropTypes.array,
	dispatch: PropTypes.func
}

export default ItineraryList