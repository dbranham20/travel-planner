import React from 'react'
import {
  Accordion,
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


export const ItineraryList = ({ itineraryList, removeItinerary }) => {
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
    <Accordion minW='40%' allowToggle>
      {
        itineraryList && itineraryList.map((it, index) => (
            <AccordionItem key={it.tripname}>
              <h2>
                <AccordionButton>
                  <Box w='100%' display='flex' justifyContent='flex-start'>
                    <strong>{it.tripName}</strong>
                  </Box>
                  <Box w='100%' display='flex' justifyContent='flex-end'>
                    {dateFormat(it?.startDate, it?.endDate)}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
              <EditItinerary key={it.tripName} itinerary={it} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
                <Box display='flex' justifyContent='flex-end'>
                  <Button marginRight='1rem' key={it.tripName} size='sm' colorScheme='purple' onClick={onOpen} >
                    Add Details
                  </Button>
                  <Button key={it.tripName} size='sm' variant='outline' colorScheme='red' onClick={() => removeItinerary(it.tripName)}>
                    Delete
                  </Button>
                </Box>
              </AccordionPanel>
            </AccordionItem>
          )
        )
      }
    </Accordion>
  )
}

export default ItineraryList