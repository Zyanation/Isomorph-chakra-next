import React, { useEffect } from 'react'
import { useState } from 'react'
import { Kovan, DAppProvider, useEtherBalance, useTokenBalance, useEthers, Config, useCall, CallResult, useContractFunction } from '@usedapp/core'
import { utils, ethers, Signer, BigNumber } from 'ethers'

import {
    Select,
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

export const ManagePositions = ({ADDR, UIcolor, contract_signer, signer, forceRender}
    ) => {


      let gen_ABI = ["function approve(address _spender, uint256 _value) public returns (bool success)", "function allowance(address owner, address spender)"]
      let temp_contract = new ethers.Contract("0x2a622f65D4468d03Cb0b28Ff19BbE4C68C704f0a", gen_ABI, signer);


      let { state, send } = useContractFunction(temp_contract, "approve", { transactionName: "approve", signer: signer })

      useEffect(() => {
        forceRender()
      }, [state])

      const handleapproveMousd = async () => {

          console.log(signer)
          send("0xD4e9503C91E2D426c8a95CF966DA3f8F31fBcb93", "1000000000000000000000000000000000000000")
    }

        const [addcollatvalue, setaddcollatvalue] = useState(0)

  return (
    <div>


<Box borderTop="0px" rounded='lg' bgColor={UIcolor}>
<Accordion justifyContent="center" w="120vh" allowMultiple>
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
                  <VStack h="300px" bgColor={UIcolor} alignItems="flex-start">

                          <VStack>
                              <HStack ml="5vh" spacing="20vh" >
                                    <AddCollat
                                    ADDR={ADDR}
                                    contract_signer={contract_signer}
                                    signer={signer} 
                                    addcollatvalue={addcollatvalue} 
                                    setaddcollatvalue={setaddcollatvalue}
                                    forceRender={forceRender}
                                    />

                                    <AddLoan
                                    ADDR={ADDR}
                                    contract_signer={contract_signer} 
                                    signer={signer}
                                    forceRender={forceRender}
                                    />
                              </HStack>
                          </VStack>


                            <VStack >
                              <HStack ml="5vh" spacing="17vh">
                                    <RemoveCollat 
                                    ADDR={ADDR}
                                    contract_signer={contract_signer} 
                                    signer={signer}
                                    forceRender={forceRender}
                                    />

                                    <RepayLoan 
                                    ADDR={ADDR}
                                    contract_signer={contract_signer} 
                                    signer={signer}
                                    forceRender={forceRender}
                                    />
  {/* isLoading={isLoading || signer ? isLoading : false}  */}
                                  <Button alignSelf="center" colorScheme="green" size="sm" onClick={handleapproveMousd}>Approve MoUSD</Button>

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


export const EmptyManagePositions = ({UIcolor}) => {
  return (
    <div>
        
                                        <Box borderTop="0px" rounded='lg' bgColor={UIcolor}>
                                          <Accordion justifyContent="center" w="120vh">
                                          <AccordionItem rounded='lg'>
                                              <AccordionButton>
                                                <Box pb="10px" m="10px" flex='1' textAlign='left'>
                                                  <Heading size="sm" mt="5px">Manage loan</Heading>
                                                  
                                                </Box>
                                                <AccordionIcon />
                                              </AccordionButton>
                                              </AccordionItem>
                                          </Accordion>
                                          </Box>
    </div>
  )
}

export default ManagePositions






function AddCollat({ADDR, contract_signer, signer, addcollatvalue, setaddcollatvalue, forceRender}) {
      

    // const SUSD_ADDR = '0x4Da278314fE590698BFA6b53998d0367D4bd8eBb'

    // const contractAddress = '0x02bbd24F4C493946A5D875BCE0A2CE2F4a6fd087'


    let { state, send } = useContractFunction(contract_signer, "increaseCollateralAmount", { transactionName: "increaseCollateralAmount", signer: signer })

    useEffect(() => {
      forceRender()
    }, [state])


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
      console.log("babaaddloan", "addr", ADDR, "cs", contract_signer, "signer", signer, forceRender)
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


function AddLoan({contract_signer, signer, ADDR, forceRender}) {
const [addloanvalue, setaddloanvalue] = useState(0)

const SUSD_ADDR = '0x4Da278314fE590698BFA6b53998d0367D4bd8eBb'

const contractAddress = '0x02bbd24F4C493946A5D875BCE0A2CE2F4a6fd087'



let { state, send } = useContractFunction(contract_signer, "openLoan", { transactionName: "openLoan", signer: signer })

useEffect(() => {
  forceRender()
}, [state])


const labelStyles = {
  mt: '2',
  ml: '-2.5',
  fontSize: 'sm',
}

const handleAddLoanClick = () => {

  console.log("contract and signer", contract_signer, signer)
  send(ADDR, utils.parseUnits("0.0000000001"), utils.parseUnits(addloanvalue.toString()))

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

function RemoveCollat({contract_signer, signer, ADDR, forceRender}) {
const [removecollatvalue, setremovecollatvalue] = useState(0)

const SUSD_ADDR = '0x4Da278314fE590698BFA6b53998d0367D4bd8eBb'

const contractAddress = '0x02bbd24F4C493946A5D875BCE0A2CE2F4a6fd087'



let { state, send } = useContractFunction(contract_signer, "closeLoan", { transactionName: "closeLoan", signer: signer })

useEffect(() => {
  forceRender()
}, [state])


const labelStyles = {
  mt: '2',
  ml: '-2.5',
  fontSize: 'sm',
}

const handleRemoveCollatClick = () => {

  console.log("babaremovecollat", utils.parseUnits(removecollatvalue.toString()), utils.parseUnits("1"))
  send(ADDR, utils.parseUnits(removecollatvalue.toString()), utils.parseUnits("0.0000001"))

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



function RepayLoan({ADDR, contract_signer, signer, forceRender}) {
const [repayloanvalue, setrepayloanvalue] = useState(0)

const SUSD_ADDR = '0x4Da278314fE590698BFA6b53998d0367D4bd8eBb'

const contractAddress = '0x02bbd24F4C493946A5D875BCE0A2CE2F4a6fd087'



let { state, send } = useContractFunction(contract_signer, "closeLoan", { transactionName: "closeLoan", signer: signer })

useEffect(() => {
  forceRender()
}, [state])


const labelStyles = {
  mt: '2',
  ml: '-2.5',
  fontSize: 'sm',
}

const handleRepayLoanClick = () => {

  console.log("babarepayloan", "addr", ADDR, "cs", contract_signer, "signer", signer, forceRender)
  send(ADDR, utils.parseUnits("0.0000000001"), utils.parseUnits(repayloanvalue.toString()))

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