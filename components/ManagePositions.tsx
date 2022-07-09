import React from 'react'
import { useState } from 'react'
import { Kovan, DAppProvider, useEtherBalance, useTokenBalance, useEthers, Config, useCall, CallResult, useContractFunction } from '@usedapp/core'
import { utils, ethers, Signer, BigNumber } from 'ethers'

import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
  } from '@chakra-ui/react'
  
  import {
    Button,
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
    Heading,
    AccordionIcon,
    VStack,
    HStack,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Text,
    Box,
    StatNumber
  } from '@chakra-ui/react'

export const ManagePositions = ({ADDR, useColorModeValue, contract_signer, signer, addcollatvalue, setaddcollatvalue}
    ) => {

        
  return (
    <div>


<Box borderTop="0px" rounded='lg' bgColor={useColorModeValue('gray.100', 'blackAlpha.700')}>
<Accordion justifyContent="center" w="120vh" defaultIndex={[0]} allowMultiple>
<AccordionItem rounded='lg'>
  <h2>
    <AccordionButton>
      <Box pb="10px" m="10px" flex='1' textAlign='left'>
        <Heading size="sm" mt="5px">Manage loan</Heading>
        
      </Box>
      <AccordionIcon />
    </AccordionButton>
  </h2>
  <AccordionPanel justifyContent="center" mb="10px" pb={4} fill="full" width="100vh">
                  <VStack h="300px" bgColor={useColorModeValue('gray.100', 'blackAlpha.100')} alignItems="flex-start">

                          <VStack>
                              <HStack ml="5vh" spacing="20vh" >
                                    <AddCollat
                                    ADDR={ADDR}
                                    contract_signer={contract_signer}
                                    signer={signer} 
                                    addcollatvalue={addcollatvalue} 
                                    setaddcollatvalue={setaddcollatvalue} />

                                    <AddLoan
                                    ADDR={ADDR}
                                    contract_signer={contract_signer} 
                                    signer={signer}/>
                              </HStack>
                          </VStack>


                            <VStack >
                              <HStack ml="5vh" spacing="17vh">
                                    <RemoveCollat 
                                    ADDR={ADDR}
                                    contract_signer={contract_signer} 
                                    signer={signer}/>

                                    <RepayLoan 
                                    ADDR={ADDR}
                                    contract_signer={contract_signer} 
                                    signer={signer}/>
                              </HStack>
                          </VStack>
                  </VStack>
    

  </AccordionPanel>
</AccordionItem>
</Accordion>
</Box>








    </div>
  )
}






function AddCollat({ADDR, contract_signer, signer, addcollatvalue, setaddcollatvalue}) {
      

    // const SUSD_ADDR = '0x4Da278314fE590698BFA6b53998d0367D4bd8eBb'

    // const contractAddress = '0x02bbd24F4C493946A5D875BCE0A2CE2F4a6fd087'

    

    let { state, send } = useContractFunction(contract_signer, "increaseCollateralAmount", { transactionName: "increaseCollateralAmount", signer: signer })


    const labelStyles = {
      mt: '2',
      ml: '-2.5',
      fontSize: 'sm',
    }

    const handleAddCollatClick = async () => {

    //   await setMethod("increaseCollateralAmount")
    //   await setContract(contractAddress)

    //   console.log(useMethod, useContract)
  
      console.log("calling add loan", signer)
      console.log("values sending", ADDR, addcollatvalue)
      send(ADDR, utils.parseUnits(addcollatvalue.toString()))

    }

    const maxaddcollatvalue = 1000

    return (
      <Box pt={6} pb={2}>
    
        Add collateral :
        <NumberInput position="absolute" width="370px" size="sm" 
        defaultValue={15} 
        max={maxaddcollatvalue} 
        value={addcollatvalue ? addcollatvalue : 0} 
        onChange={(val) => setaddcollatvalue(val)}>
          <HStack justifyContent='space-between' spacing="20px" width="230px">
          <NumberInputField /><Button size="sm" right="80px" position="absolute" colorScheme="green" variant="outline" onClick={handleAddCollatClick} isDisabled={false}>Add</Button>
          </HStack>
        
        </NumberInput>
        <Slider alignContent="flex-start" mt="50px" minW="130px" aria-label='slider-ex-6' max={maxaddcollatvalue} value={addcollatvalue} onChange={(val) => setaddcollatvalue(val)}>
  

            <SliderTrack>
              <SliderFilledTrack bg='purple.400'/>
            </SliderTrack>
            <SliderThumb />
          
        </Slider>
      </Box>
    )
}


function AddLoan({contract_signer, signer, ADDR}) {
const [addloanvalue, setaddloanvalue] = useState(0)

const SUSD_ADDR = '0x4Da278314fE590698BFA6b53998d0367D4bd8eBb'

const contractAddress = '0x02bbd24F4C493946A5D875BCE0A2CE2F4a6fd087'



let { state, send } = useContractFunction(contract_signer, "openLoan", { transactionName: "openLoan", signer: signer })


const labelStyles = {
  mt: '2',
  ml: '-2.5',
  fontSize: 'sm',
}

const handleAddLoanClick = () => {

  console.log("contract and signer", contract_signer, signer)
  send(ADDR, utils.parseUnits("1"), utils.parseUnits(addloanvalue.toString()))

  // utils.parseUnits(sliderValue.toString()), utils.parseUnits(loanslidervalue.toString())
  

}

const maxaddloanvalue = 1000

return (
  <Box pt={6} pb={2}>

    Increase loan :
    <NumberInput position="absolute" width="370px" size="sm" defaultValue={15} max={maxaddloanvalue} value={addloanvalue} onChange={(val) => setaddloanvalue(val)}>
      <HStack justifyContent='space-between' spacing="20px" width="230px">
      <NumberInputField /><Button size="sm" right="80px" position="absolute" colorScheme="green" variant="outline" onClick={handleAddLoanClick} isDisabled={false}>Add</Button>
      </HStack>
    
    </NumberInput>
    <Slider alignContent="flex-start" mt="50px" minW="130px" aria-label='slider-ex-6' max={maxaddloanvalue} value={addloanvalue} onChange={(val) => setaddloanvalue(val)}>


        <SliderTrack>
          <SliderFilledTrack bg='purple.400'/>
        </SliderTrack>
        <SliderThumb />
      
    </Slider>
  </Box>
)
}

function RemoveCollat({contract_signer, signer, ADDR}) {
const [removecollatvalue, setremovecollatvalue] = useState(0)

const SUSD_ADDR = '0x4Da278314fE590698BFA6b53998d0367D4bd8eBb'

const contractAddress = '0x02bbd24F4C493946A5D875BCE0A2CE2F4a6fd087'



let { state, send } = useContractFunction(contract_signer, "closeLoan", { transactionName: "closeLoan", signer: signer })


const labelStyles = {
  mt: '2',
  ml: '-2.5',
  fontSize: 'sm',
}

const handleRemoveCollatClick = () => {

  console.log(contract_signer)
  send(ADDR, utils.parseUnits(removecollatvalue.toString()), utils.parseUnits("1"))

}

const maxremovecollatvalue = 1000

return (
  <Box pt={6} pb={2}>

    Remove collateral :
    <NumberInput position="absolute" width="370px" size="sm" defaultValue={15} max={maxremovecollatvalue} value={removecollatvalue} onChange={(val) => setremovecollatvalue(val)}>
      <HStack justifyContent='space-between' spacing="20px" width="230px">
      <NumberInputField /><Button size="sm" right="50px" position="absolute" colorScheme="red" variant="outline" onClick={handleRemoveCollatClick} isDisabled={false}>Remove</Button>
      </HStack>
    
    </NumberInput>
    <Slider alignContent="flex-start" mt="50px" minW="130px" aria-label='slider-ex-6' max={maxremovecollatvalue} value={removecollatvalue} onChange={(val) => setremovecollatvalue(val)}>


        <SliderTrack>
          <SliderFilledTrack bg='purple.400'/>
        </SliderTrack>
        <SliderThumb />
      
    </Slider>
  </Box>
)
}



function RepayLoan({ADDR, contract_signer, signer}) {
const [repayloanvalue, setrepayloanvalue] = useState(0)

const SUSD_ADDR = '0x4Da278314fE590698BFA6b53998d0367D4bd8eBb'

const contractAddress = '0x02bbd24F4C493946A5D875BCE0A2CE2F4a6fd087'



let { state, send } = useContractFunction(contract_signer, "closeLoan", { transactionName: "closeLoan", signer: signer })


const labelStyles = {
  mt: '2',
  ml: '-2.5',
  fontSize: 'sm',
}

const handleRepayLoanClick = () => {

  console.log(contract_signer)
  send(ADDR, utils.parseUnits("1"), utils.parseUnits(repayloanvalue.toString()))

}

const maxrepayloanvalue = 1000

return (
  <Box pt={6} pb={2}>

    Repay loan :
    <NumberInput position="absolute" width="382px" size="sm" defaultValue={15} max={maxrepayloanvalue} value={repayloanvalue} onChange={(val) => setrepayloanvalue(val)}>
      <HStack justifyContent='space-between' spacing="20px" width="230px">
      <NumberInputField /><Button size="sm" right="80px" position="absolute" colorScheme="green" variant="outline" onClick={handleRepayLoanClick} isDisabled={false}>Repay</Button>
      </HStack>
    
    </NumberInput>
    <Slider alignContent="flex-start" mt="50px" minW="130px" 
    aria-label='slider-ex-6' 
    max={maxrepayloanvalue} 
    value={repayloanvalue} 
    onChange={(val) => setrepayloanvalue(val)}>


        <SliderTrack>
          <SliderFilledTrack bg='purple.400'/>
        </SliderTrack>
        <SliderThumb />
      
    </Slider>
  </Box>
)
}