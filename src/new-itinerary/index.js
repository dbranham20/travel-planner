import React, { useState, useMemo } from 'react'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	VStack,
	Input,
	Button,
	HStack,
	Grid,
	GridItem,
	Text,
	InputRightElement,
	InputGroup,
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import PropTypes from 'prop-types'

export const NewItineraryForm = ({ isOpen, onClose, onSubmit, itineraries }) => {
	const [startDate, setStartDate] = useState()
	const [endDate, setEndDate] = useState()
	const [tripName, setTripName] = useState()
	const [nameError, setNameError] = useState()

	const errors = useMemo(() => {		
		if (nameError) return true
		if (!endDate) return true
		if (!startDate) return true
		if (!tripName) return true
		else return false

	}, [nameError, endDate, startDate, tripName])

	const handleSubmit = () => {
		onSubmit({startDate, endDate, tripName})
		handleClose()
	}

	const handleClose = () => {
		setStartDate('')
		setEndDate('')
		setTripName('')
		onClose()
	}

	const validateTripName = (currentName) => {
		var nameArr = itineraries.map(it => it.tripName)
		var isDuplicate = nameArr.filter((item) => item === currentName)

		if (isDuplicate.length > 0) {
			setNameError('Duplicate Trip Name!')
		} else {
			setNameError()
		}
		setTripName(currentName)
	}

	return (
		<VStack>
			<Modal isOpen={isOpen} onClose={handleClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Modal Title</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
                Enter a name for you trip
						<InputGroup>
							<Input 
								focusBorderColor={nameError ? 'red' : 'blue'}
								isInvalid={nameError}
								value={tripName} 
								placeholder='Trip Name' 
								onChange={(event) => validateTripName(event.target.value)} 
								required={true}
							/>
							{
								nameError && 
                  // eslint-disable-next-line react/no-children-prop
                  <InputRightElement paddingRight='5rem' children={
                  	<>
                  		<Text whiteSpace='nowrap' paddingRight='.5rem' color='red' fontSize='xs'><strong>{nameError}</strong></Text>
                  		<CloseIcon color='red' />
                  	</>
                  } />
							}
						</InputGroup>

						<HStack paddingBottom='1rem'>
							<Grid templateColumns='repeat(5, 1fr)' gap={6} pt='3' >
								<GridItem w='100%' h='10'>
                      Start Date
									<Input required={true} value={startDate} type='date' placeholder='Start Date' onChange={(event) => setStartDate(event.target.value)} />
								</GridItem>
								<GridItem w='100%' h='10'>
                      End Date
									<Input required={true} value={endDate} type='date' placeholder='End Date' onChange={(event) => setEndDate(event.target.value)} />
								</GridItem>
							</Grid>
						</HStack>

					</ModalBody>
					<ModalFooter>
						<Button 
							variant='ghost' 
							colorScheme='purple' 
							mr={3} 
							onClick={handleClose}
						>
                  Close
						</Button>
						<Button 
							disabled={errors} 
							colorScheme='purple' 
							mr={3} 
							onClick={handleSubmit}
						>
                  Submit
						</Button>
               
					</ModalFooter>
				</ModalContent>
			</Modal>
		</VStack>
	)
}

NewItineraryForm.propTypes = {
	isOpen: PropTypes.bool, 
	onClose: PropTypes.func, 
	onSubmit: PropTypes.func, 
	itineraries: PropTypes.array
}

export default NewItineraryForm