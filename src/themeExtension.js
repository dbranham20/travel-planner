import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  components: {
    Divider: {
      variants: {
        'bold': {
          colorScheme: 'black',
          opacity: '1',
          fontWeight: 'bold'
        }
      }
    },
  },
})

export default theme
