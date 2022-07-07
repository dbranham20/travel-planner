import React from 'react'
import {
  Input,
  DrawerBody,
  DrawerHeader,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  DrawerFooter,
  Button,
  Drawer,
  Box
} from '@chakra-ui/react';
import { format } from 'date-fns'


const EditItinerary = ({ itinerary, isOpen, onClose, key }) => {
  const btnRef = React.useRef()

  const dateFormat = (date) => {
    return format(new Date(date), 'MMMM, do yyyy')
  }

  return (
    <>
      <Drawer
        key={key}
        id={itinerary.tripName}
        size='sm'
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Details for {itinerary.tripName}</DrawerHeader>
          <Box w='100%' display='flex' justifyContent='flex-start' paddingLeft='1.5rem'>
            <h4>{dateFormat(itinerary?.startDate)} - {dateFormat(itinerary?.endDate)}</h4>
          </Box>
          <DrawerBody>
            <Input placeholder='Type here...' />
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='purple'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default EditItinerary