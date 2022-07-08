import React, { useEffect, useState } from 'react'

import {
  Input,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import {
  DeleteIcon
} from '@chakra-ui/icons'

const EventInputs = ({ index, removeEvent, event, setEvent}) => {

  return (
    <HStack>
      <Input onChange={(input) => setEvent({id: index, eventName: input.target.value})} />
      <Input type='datetime-local' onChange={(input) => setEvent({...event, date: input.target.value})} />
      <IconButton 
        onClick={removeEvent}
        size='sm' icon={<DeleteIcon color='red'/>} 
      />
    </HStack> 
  )
}

export default EventInputs