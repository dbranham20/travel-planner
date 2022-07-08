import React from 'react'
import {
  Accordion
} from '@chakra-ui/react'
import WrappedAccordionItem from './accordion-item'


export const ItineraryList = ({ itineraryList, removeItinerary }) => {

  return (
    <Accordion minW='40%' allowToggle>
      {
        itineraryList && itineraryList.map((it) => (
            <WrappedAccordionItem itinerary={it} removeItinerary={removeItinerary}/>
          )
        )
      }
    </Accordion>
  )
}

export default ItineraryList