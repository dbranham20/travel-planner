import React, { useState, useCallback } from 'react'
import { debounce } from 'lodash'

import {
	Input,
	HStack,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { DeleteIcon } from '@chakra-ui/icons'

const EventInputs = ({ id, removeEvent, description, datetime }) => {
	const [currDescription, setCurrDescription] = useState(description || '')
	const [currDatetime, setCurrDatetime] = useState(datetime || '')
	const onChangeDesc = useCallback(value => request(value), [])

	const request = debounce(e => {
		console.log('saving', e.target.value)
		setCurrDescription(description)
	}, 1000)

	const onChangeDate = e => {
		setCurrDatetime(e.target.value)
	}

	return (
		<HStack>
			<Input onChange={onChangeDesc} value={currDescription} />
			<Input type='datetime-local' onChange={onChangeDate} value={currDatetime} />
			<DeleteIcon color='red' onClick={() => removeEvent(id)} />
		</HStack> 
	)
}

EventInputs.propTypes = {
	setEvent: PropTypes.func,
	description: PropTypes.string,
	datetime: PropTypes.string,
	id: PropTypes.number,
	removeEvent: PropTypes.func
}

export default EventInputs