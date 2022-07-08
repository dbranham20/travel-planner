import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Grid,
  Button,
  useDisclosure
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import NewItineraryForm from './new-itinerary'
import ItineraryList from './itinerary-list'
import theme from './themeExtension'

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [ itineraryList, setItineraryList ] = useState([])

  const removeItinerary = (itName) => {
    if (itineraryList.length === 1) {
      setItineraryList([])
    } else {
      setItineraryList(itineraryList.filter(it => it.tripName !== itName))
    }
  }

  return (
    <ChakraProvider theme={theme}>
      <Box minW='100%' textAlign="center" fontSize="xl">
        <Grid minW='200vh' minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Text>
              Welcome to your personal travel planner! 
              { itineraryList.length > 0 ? ' Here are your current itineraries.' : ' Start by adding a new itinerary.' }
            </Text>
            <ItineraryList 
              itineraryList={itineraryList} 
              removeItinerary={(value) => removeItinerary(value)} 
            />

            <Button colorScheme='purple' onClick={onOpen}>
              Add New Itinerary
            </Button>
          </VStack>
        </Grid>
        <NewItineraryForm 
          isOpen={isOpen} 
          onOpen={onOpen} 
          onClose={onClose} 
          onSubmit={(it) => setItineraryList([...itineraryList, it])} 
          itineraryList={itineraryList}
        />
      </Box>
    </ChakraProvider>
  );
}

export default App;
