import { useForm } from 'react-hook-form'
import {
	FormErrorMessage,
	FormLabel,
	FormControl,
	Input,
	Button,
	HStack,
} from '@chakra-ui/react'

import { DeleteIcon } from '@chakra-ui/icons'

import PropTypes from 'prop-types'

const EventInputs = ({ removeEvent, id }) => {
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm()

	function onSubmit(values) {
		return new Promise((resolve) => {
			setTimeout(() => {
				alert(JSON.stringify(values, null, 2))
				resolve()
			}, 3000)
		})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormControl isInvalid={errors.name}>
				 
				<FormErrorMessage>
					{errors.name && errors.name.message}
				</FormErrorMessage>
			</FormControl>
			<Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
        Submit
			</Button>
		</form>
	)
}

EventInputs.propTypes = {
	id: PropTypes.number,
	removeEvent: PropTypes.func
}


export default EventInputs