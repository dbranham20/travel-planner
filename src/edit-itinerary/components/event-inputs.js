import React from 'react'

import {
	Input,
	HStack,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'

const EventInputs = ({ setEvent, event }) => {

	return (
		<HStack>
			<Input onChange={(input) => setEvent({...event, eventName: input.target.value})} />
			<Input type='datetime-local' onChange={(input) => setEvent({...event, date: input.target.value})} />
		</HStack> 
	)
}

EventInputs.propTypes = {
	setEvent: PropTypes.func,
	event: PropTypes.object
}

export default EventInputs