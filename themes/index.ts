import {extendTheme,
     theme as base,
     withDefaultVariant } from '@chakra-ui/react'

     

const config = {
    useSystemColorMode: true,
    // initialColorMode: 'dark',
    
}



const theme = extendTheme({config,

      

    
    fonts: {
        heading: `Montserrat, ${base.fonts?.heading}`,
        body: `Inter, ${base.fonts?.body}`,
        },

        components: {
            Input: {
                sizes: {
                    md: {
                        field: {
                            // borderRadius : 'none'
                        }
                    }
                }
            }
        },

    },

    
    
    withDefaultVariant({
        variant: 'filled',
        components: ['Input', 'Select']
    })

);



export default theme