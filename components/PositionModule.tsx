import React from 'react'
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
  } from '@chakra-ui/react'
  
  import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
  } from '@chakra-ui/react'
  
  import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
  } from '@chakra-ui/react'
  
  import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
  } from '@chakra-ui/react'
  
  import {
    Container,
    Divider,
    Select,
    Heading,
    Image,
    Square,
    Center,
    Spinner,
    Box,
    Flex,
    Input,
    Text,
    IconButton,
    Button,
    HStack,
    VStack,
    Stack,
    StackDivider,
    Collapse,
    Icon,
    Link,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorMode,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure
  } from '@chakra-ui/react';
  
  import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'

import PersonalPositions from './PersonalPositions'
import ManagePositions from './ManagePositions'

export const PositionModule = ({key, _LoanDisplay, _PostedDisplay, _CollatPriceDisplay, _Interest, _minOpeningMargin, CollatName , ADDR, signer, account, ethersToNum, UIcolor, contract_signer, forceRender}) => {
    
 
    return (
    <div>


                 {/* ETH's part dashboard*/}

                 {_CollatPriceDisplay != '0' && signer ? 
                <>

          <Box mt="3vh" rounded='lg' bgColor={UIcolor}>
          <TableContainer rounded='lg' mt={5} w="120vh">
            <Table variant='simple' colorScheme='facebook' size="md" pos="static">
  

                                  <PersonalPositions 
                                    account={account}
                                    _LoanDisplay={_LoanDisplay}
                                    _PostedDisplay={_PostedDisplay}
                                    _CollatPriceDisplay={_CollatPriceDisplay}
                                    _Interest={_Interest}
                                    _minOpeningMargin={_minOpeningMargin}
                                    ethersToNum={ethersToNum}
                                    CollatName={CollatName}
                                  />


                  </Table>
                  </TableContainer>
                  </Box>
               
                </> 
                : 
                <> 

                {/* //This should contain nothing */}
                </>}


                      {/* Manage loan position for ETH!! */}
                      {_CollatPriceDisplay != '0' && signer ? 
                  
                                          

                  <ManagePositions 
                  ADDR={ADDR}
                  UIcolor={UIcolor}
                  contract_signer={contract_signer}
                  signer={signer}
                  forceRender={forceRender}
                  
                  
                  />

                  :

                  <>    
                  </>

}








    </div>
  )
}