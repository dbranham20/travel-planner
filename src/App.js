import React from 'react'
import {
	ChakraProvider,
	Box,
	Text,
	VStack,
	Grid,
	Button,
	useDisclosure
} from '@chakra-ui/react'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import NewItineraryForm from './new-itinerary'
import ItineraryList from './itinerary-list'
import theme from './themeExtension'
import { useItinerary, ITINERARY_ADD } from './App.hooks'

function App() {
	const { itineraries, dispatch } = useItinerary()
	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<ChakraProvider theme={theme}>
			<Box minW='100%' textAlign="center" fontSize="xl">
				<Grid minW='200vh' minH="100vh" p={3}>
					<ColorModeSwitcher justifySelf="flex-end" />
					<VStack spacing={8}>
						<Text>
              Welcome to your personal travel planner! 
							{ itineraries.length > 0 ? ' Here are your current itineraries.' : ' Start by adding a new itinerary.' }
						</Text>
						<ItineraryList dispatch={dispatch} itineraries={itineraries} />
						<Button colorScheme='purple' onClick={onOpen}>
              Add New Itinerary
						</Button>
					</VStack>
				</Grid>
				<NewItineraryForm 
					isOpen={isOpen} 
					onOpen={onOpen} 
					onClose={onClose} 
					onSubmit={(it) => dispatch({ type: ITINERARY_ADD, itinerary: it })} 
					itineraries={itineraries}
				/>
			</Box>
		</ChakraProvider>
	)
}

export default App
