import React from 'react'

import {
	Input,
	HStack,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'

const EventInputs = ({ setEvent, event }) => {

	console.log(event)
	return (
		<HStack>
			<Input onChange={(input) => setEvent({...event, description: input.target.value})} value={event?.eventName} />
			<Input type='datetime-local' onChange={(input) => setEvent({...event, datetime: input.target.value})} value={event?.date} />
		</HStack> 
	)
}

EventInputs.propTypes = {
	setEvent: PropTypes.func,
	event: PropTypes.object
}

export default EventInputs