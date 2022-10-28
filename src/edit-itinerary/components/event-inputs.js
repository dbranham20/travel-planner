import React from 'react'

import {
	Input,
	HStack,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { DeleteIcon } from '@chakra-ui/icons'

const EventInputs = ({ setEvent, event, removeEvent }) => {

	console.log(event)
	return (
		<HStack>
			<Input onChange={(input) => setEvent({...event, description: input.target.value})} value={event.description} />
			<Input type='datetime-local' onChange={(input) => setEvent({...event, datetime: input.target.value})} value={event.datetime} />
			<DeleteIcon color='red' onClick={() => removeEvent(event.id)} />
		</HStack> 
	)
}

EventInputs.propTypes = {
	setEvent: PropTypes.func,
	event: PropTypes.object,
	removeEvent: PropTypes.func
}

export default EventInputs