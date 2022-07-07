import React, { useState } from 'react'
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

export const NewItineraryForm = ({isOpen, onClose, onOpen, onSubmit, itineraryList}) => {
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [tripName, setTripName] = useState()
    const [nameError, setNameError] = useState()

    const handleSubmit = () => {
      onSubmit({startDate, endDate, tripName})
      handleClose()
    }

    const handleClose = () => {
      setStartDate(new Date())
      setEndDate(new Date())
      setTripName('')
      onClose()
    }

    const validateTripName = (currentName) => {
      var valueArr = itineraryList.map((item) => item.tripName)
      var isDuplicate = valueArr.filter((item) => item === currentName )

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
                />
                {
                nameError && 
                  <InputRightElement paddingRight='5rem' children={
                    <>
                      <Text whiteSpace='nowrap' paddingRight='.5rem' color='red' fontSize='xs'><strong>{nameError}</strong></Text>
                      <CloseIcon color='red' />
                    </>
                  } />
                }
              </InputGroup>

                <HStack>
                  <Grid templateColumns='repeat(5, 1fr)' gap={6} pt='3' >
                    <GridItem w='100%' h='10'>
                      <Input value={startDate} type='date' placeholder='Start Date' onChange={(event) => setStartDate(event.target.value)} />
                    </GridItem>
                    <GridItem w='100%' h='10'>
                      <Input value={endDate} type='date' placeholder='End Date' onChange={(event) => setEndDate(event.target.value)} />
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
                  disabled={nameError} 
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

export default NewItineraryForm