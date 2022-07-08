import React from 'react'
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
  import EditItinerary from '../edit-itinerary'

const WrappedAccordionItem = ({itinerary, removeItinerary}) => {
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
    <AccordionItem key={itinerary.tripname}>
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
      <EditItinerary key={itinerary.tripName} itinerary={itinerary} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        <Box display='flex' justifyContent='flex-end'>
          <Button marginRight='1rem' size='sm' colorScheme='purple' onClick={onOpen} >
            Add Details
          </Button>
          <Button size='sm' variant='outline' colorScheme='red' onClick={() => removeItinerary(itinerary.tripName)}>
            Delete
          </Button>
        </Box>
      </AccordionPanel>
    </AccordionItem>
  )
}

export default WrappedAccordionItem