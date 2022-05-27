import React, { useEffect } from 'react'
import {useState} from 'react'
import { Kovan, DAppProvider, useEtherBalance, useTokenBalance, useEthers, Config, useCall, CallResult, useContractFunction } from '@usedapp/core'
import { utils, ethers, Signer, BigNumber } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import util from 'util'

import mousd_abi from '../components/mousd_abi.json'

import { useToast } from '@chakra-ui/react'

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
import { off } from 'process'




const Dashboard = ({...pageProps}) => {

  const toast = useToast()
  const MOUSD_ADDR = '0xBd008Bdd48b391CaF1523efb966F2288F555bbE0'
  const SUSD_ADDR = '0xd67CE643E4d4f530a66840F7f2AAa806FcE7C960'

  const contractAddress = '0xABbbaF21B366e27DFe65d7347cDa5D7C007acdd5'

  const mousdInterface = new utils.Interface(mousd_abi)
  
  const { account } = useEthers()
  const [signer, setSigner] = useState(null);
  // const etherBalance = useEtherBalance(account)


  


 

  const contract = new Contract(contractAddress, mousdInterface)

  const provider = new ethers.providers.InfuraProvider("kovan", process.env.NEXT_PUBLIC_KOVAN_INFURA);
  const contract_provider = new ethers.Contract(contractAddress, mousd_abi, provider);
  // const contract_signer = new ethers.Contract(contractAddress, mousd_abi, signer);

  //the usedapp way
  // const { value, error } = useCall({
  //   contract : new Contract(contractAddress, mousdInterface),
  //   method: 'moUSDLoaned',
  //   args: ['0x438e0B16757a148F4Aca30Cf1573576CE072f4B1', '0xBd008Bdd48b391CaF1523efb966F2288F555bbE0']
  // }) ?? {};
  // if(error) {
  //   console.error(error.message)
  //   return undefined
  // }

  const [isDisabled, setDisabled] = useState(false);


  const [ loanval, setloanval ] = useState()
  const [ collatval, setcollatval ] = useState()

  const getLoanvalue = async () => {
    const loanval = await contract_provider.moUSDLoaned(SUSD_ADDR, account)
    setloanval(loanval)
    console.log(loanval)
  }

  const getCollatvalue = async () => {
    const collatval = await contract_provider.collateralPosted(SUSD_ADDR, account)
    setcollatval(collatval)
    console.log(collatval)
  }

  const collatBalance = useTokenBalance(SUSD_ADDR, account)

  const [selectedcollat, setselectcollat] = useState()


  const getWalletcollat = async (_selectedcollat) => {

    let ADDR

    switch(_selectedcollat) {
      case "susd":
        console.log("susded")
        ADDR = SUSD_ADDR
        break;
      case "eth":
        ADDR = undefined
        console.log("ethed")

        toast({
          position: 'bottom',
          title: 'Stop, you criminal scum!',
          description: "Sorry, but we currently do not support Ethereum right now on the Kovan test net.",
          status: 'warning',
          duration: 4000,
          isClosable: true,
        })
        break;
      case "lyralp":
        
        ADDR = undefined
        console.log("lyralped")

        toast({
          position: 'bottom',
          title: 'Stop, you criminal scum!',
          description: "Sorry, but we currently do not support Lyra LP tokens right now on the Kovan test net.",
          status: 'warning',
          duration: 4000,
          isClosable: true,
        })
        break;
    }

    if (ADDR) {
      const walletcollatval = await contract_provider.collateralPosted(contractAddress, ADDR)
      setcollatval(walletcollatval)
      console.log(utils.formatEther(walletcollatval))
    }
   
    
  }

  let gen_ABI = ["function approve(address _spender, uint256 _value) public returns (bool success)", "function allowance(address owner, address spender)"]



  let susdcontract = new ethers.Contract(SUSD_ADDR, gen_ABI, signer);

  const [useContract, setContract] = useState()
  const [useMethod, setMethod] = useState("")

  let { state, send } = useContractFunction(useContract, useMethod, { transactionName: useMethod, signer: signer })

  const handlesusdapprove = async () => {
    setDisabled(true)
    setMethod("approve")
    setContract(susdcontract)
    send(contractAddress, "1000000000000000000000000000000000000000000")
  
}

  const handleOpenloanclick = () => {
    setDisabled(true)
    setMethod("openLoan")
    setContract(contract)

    console.log(contract)

    send(SUSD_ADDR, "100000000000000000000", "100000000000000000000")
    console.log(state)
  }
  




  useEffect(()=>{
    
    if(!account) return
    
    getLoanvalue()
    getCollatvalue()

    if (collatBalance) {
      setselectcollat(utils.formatUnits(collatBalance, 18))
    }

    const asyncfunc = async () => {
      let tempProvider = new ethers.providers.Web3Provider(window.ethereum)
      const newsigner = tempProvider.getSigner()
      await setSigner(newsigner)
      console.log(newsigner)

    }

    asyncfunc()
  
  }, [account])





  const [isLoading, setisLoading] = useState(false)

  useEffect(() => {
    console.warn(state.status)

    if(state.status === "PendingSignature" || state.status === "Mining") {
      setisLoading(true) }

     if(state.status === 'Success')
     {
      setisLoading(false)
      toast({
        position: 'bottom',
        title: 'Success',
        description: "Transaction succeeded",
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
    }
     
     
     
     if (state.status === 'Exception') {
      setisLoading(false)
      toast({
        position: 'bottom',
        title: 'Success',
        description: "Transaction reverted",
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }

  }, [state.status])

  function ethersToNum (_num : string) {
    if(!_num) return
    return parseInt(utils.formatEther(_num)).toFixed(2)
  }


  // const { value, error } = useCall({ contract, method: 'moUSDLoaned', args: [account ?? ''] }) ?? {}


    

      // // return value?.[0] ? (value?.[0]).toNumber() : undefined;
      // if (value) console.log(typeof(value))

      // const handleClick = () => {
      //   if (value && value[0]) {
      //     console.log(parseFloat(utils.formatUnits(value[0], 0)))

      //   }
  
      // }




//   function checkLoan(account: string | undefined): any | undefined {
//     const { value, error } = useCall(account && {
//       contract: new Contract(contractAddress, mousdInterface),
//       method: 'moUSDLoaned',
//       args: [account.toString()]
//     }) ?? {}
//     if(error) {
//       console.error(error.message)
//       return undefined
//     }
//     return value?.[0]
//  }



  

  return (
    <>



    {/* main box */}
    <Flex
    flexDir="row"
    maxW={1700}
    w={[300, 500, 1700]}
    align="center"
    justify="center"
    minH="80vh"
    mx="auto"
    mt="5vh"
    px={4}
    >
        {/* left box */}
        <Flex
        flexDir="column"
        maxW={800}
        w={[150, 300, 500]}
        h="fill"
        align="center"
        justify="flex-start"
        minH="80vh"
        mx="auto"
        mt="5vh"
        px={4}
        backgroundColor={'blackAlpha.700'}
        rounded='lg'
        

        >
            <Box w={[150, 300, 500]} h="100px" mt="3vh" p="20px" rounded='lg'>
              <VStack px="10px" w="fill" h="65vh" mb="10px" bgColor="blackAlpha.300" alignItems="flex-start">
                  <Heading size="md" mt="10px">Open position</Heading><Divider />
                  {/* <Image src="./images/susd.png"></Image> */}
          
                  <Select size="lg" placeholder='Select collateral' onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    e.preventDefault()
                    console.warn('onChange TextInput value: ' + e.target.value);
                    getWalletcollat(e.target.value)
                  }}>
                  <option value='susd'>sUSD</option>
                  <option value='eth'>Ethereum</option>
                  <option value='lyralp'>Lyra LP tokens</option>
                  </Select>
                  { collatval ?
                  <Button alignSelf="center" colorScheme="green" isLoading={isLoading ? isLoading : false} onClick={handlesusdapprove}>Approve</Button>
                  :
                  <Button alignSelf="center" colorScheme="green" isDisabled="1" isLoading={isLoading ? isLoading : false} onClick={handlesusdapprove}>Approve</Button>

                  }
                  
                  <Divider />


            
                
                <SlidebarCollateral selectedcollat={selectedcollat}/>
                


            

              <SlidebarLoan />

              <Text pt="10vh" pb="10vh">Some info here: <br></br><br></br>
                He who throws stones in glass houses, <br></br>
                sometimes gets nicked by Trevor.
              </Text>
              
              </VStack>

              <HStack spacing="20px" justifyContent="flex-end">
                    <Button colorScheme="red">Cancel</Button>
                    <Button colorScheme="green" onClick={handleOpenloanclick} isLoading={isLoading}>Confirm</Button>
              </HStack>
            </Box>

        </Flex>




        <Flex
        flexDir="column"
        maxW={1200}
        w={[200, 400, 1200]}
        align="center"
        justify="flex-start"
        minH="80vh"
        mx="auto"
        mt="5vh"
        px={4}
        overflowX="auto"
        >
          <Box mt="3vh" rounded='lg' bgColor={useColorModeValue('blackAlpha.700', 'blackAlpha.700')}>
          <TableContainer rounded='lg' mt={10} w="110vh">
            <Table variant='simple' colorScheme='facebook' size="md" pos="static">
                <Thead>
                    <Tr><Th>Personal Positions</Th></Tr>
                </Thead>
                <Thead>
                  <Tr>
                    <Th>MoUSD loaned</Th>
                    <Th isNumeric>Value (USD)</Th>
                    <Th>Assets backing</Th>
                    <Th isNumeric>Value (USD)</Th>
                    <Th isNumeric>Liquidation price (USD)</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr height="150px">

                    {!account ? 
                      <Box position="relative" alignSelf="center" left="450px" top="50px">No open positions</Box>
                  :
                    <>
                    <Td><StatNumber>{loanval && ethersToNum(loanval)} MOUSD</StatNumber></Td>
                    <Td><StatNumber>$ {loanval && ethersToNum(loanval)}</StatNumber></Td>
                    <Td><Text><StatNumber>{collatval && ethersToNum(collatval)} sUSD</StatNumber></Text></Td>
                    <Td isNumeric>{collatval && ethersToNum(collatval)}</Td>
                    <Td isNumeric>{loanval && ethersToNum(collatval)/ethersToNum(loanval)*(ethersToNum(loanval))*0.6 }</Td>
                    </>
                  
                  }

                      

                    


                  </Tr>
                  </Tbody>

                  </Table>
                  </TableContainer>
                  </Box>

<Box rounded='lg' bg='blackAlpha.700'>
<Accordion justifyContent="center" w="100vh" defaultIndex={[0]} allowMultiple>
<AccordionItem rounded='lg'>
  <h2>
    <AccordionButton>
      <Box m="10px" flex='1' textAlign='left'>
        <Heading size="sm" >Manage loan</Heading>
      </Box>
      <AccordionIcon />
    </AccordionButton>
  </h2>
  <AccordionPanel justifyContent="center" mb="10px" pb={4} fill="full" width="100vh">
                  <VStack h="300px" bgColor="blackAlpha.300" alignItems="flex-start">

                          <VStack>
                              <HStack ml="5vh" spacing="20vh" >
                                    <AddCollat contract={contract} signer={signer}/>
                                    <AddLoan contract={contract} signer={signer}/>
                              </HStack>
                          </VStack>


                            <VStack >
                              <HStack ml="5vh" spacing="17vh">
                                    <RemoveCollat contract={contract} signer={signer}/>
                                    <RepayLoan contract={contract} signer={signer}/>
                              </HStack>
                          </VStack>
                  </VStack>
    

  </AccordionPanel>
</AccordionItem>
</Accordion>
</Box>

        </Flex>
      
      </Flex>

    </>
  )
}

export default Dashboard


function SlidebarCollateral({selectedcollat}) {
  const [sliderValue, setSliderValue] = useState(50)




  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  }

  return (
    <Box pt={6} pb={2}>
        <Heading mb="15px" size="sm">Collateral amount :</Heading>
      <NumberInput position="absolute" width="500px" size="md" defaultValue={15} max={selectedcollat} value={sliderValue} onChange={(val) => setSliderValue(val)}>
        <HStack justifyContent='space-between' spacing="20px" width="430px">
        <NumberInputField /><Button size="sm" right="80px" position="absolute" colorScheme="red" variant="outline" onClick={()=> {setSliderValue(selectedcollat)}}>Max</Button>
        </HStack>
      
      </NumberInput>
      <Slider alignContent="flex-start" mt="50px" minW="380px" aria-label='slider-ex-6' max={selectedcollat} value={sliderValue} onChange={(val) => setSliderValue(val)}>
 

          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        
      </Slider>
    </Box>
  )
}


function SlidebarLoan() {
  const [loanslidervalue, setloanslidervalue] = useState(50)

  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  }

  return (
    <Box pt={6} pb={2}>
      <Heading mb="15px" size="sm">Loan amount: </Heading>
      <NumberInput width="10px" size="md" defaultValue={15} max={100} value={loanslidervalue} onChange={(val) => setloanslidervalue(val)}>
        <HStack justifyContent='space-between' width="430px">
        <NumberInputField />
        </HStack>
      
      </NumberInput>
      <Slider width="400px" aria-label='slider-ex-6' onChange={(val) => setloanslidervalue(val)}>
 
  <SliderTrack>
    <SliderFilledTrack />
  </SliderTrack>
  <SliderThumb />
</Slider>
    </Box>
  )
}


function AddCollat({contract, signer}) {
      const [addcollatvalue, setaddcollatvalue] = useState(0)

      const SUSD_ADDR = '0xd67CE643E4d4f530a66840F7f2AAa806FcE7C960'

      const contractAddress = '0xABbbaF21B366e27DFe65d7347cDa5D7C007acdd5'

      

      let { state, send } = useContractFunction(contract, "increaseCollateralAmount", { transactionName: "increaseCollateralAmount", signer: signer })


      const labelStyles = {
        mt: '2',
        ml: '-2.5',
        fontSize: 'sm',
      }

      const handleAddCollatClick = () => {
    
        console.log(contract)
        send(SUSD_ADDR, "1000000")

      }

      const maxaddcollatvalue = 1000

      return (
        <Box pt={6} pb={2}>
      
          Add collateral:
          <NumberInput position="absolute" width="370px" size="sm" defaultValue={15} max={maxaddcollatvalue} value={addcollatvalue} onChange={(val) => setaddcollatvalue(val)}>
            <HStack justifyContent='space-between' spacing="20px" width="230px">
            <NumberInputField /><Button size="sm" right="80px" position="absolute" colorScheme="green" variant="outline" onClick={handleAddCollatClick} isDisabled='true'>Add</Button>
            </HStack>
          
          </NumberInput>
          <Slider alignContent="flex-start" mt="50px" minW="130px" aria-label='slider-ex-6' max={maxaddcollatvalue} value={addcollatvalue} onChange={(val) => setaddcollatvalue(val)}>
    

              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            
          </Slider>
        </Box>
      )
}


function AddLoan({contract, signer}) {
  const [addcollatvalue, setaddcollatvalue] = useState(0)

  const SUSD_ADDR = '0xd67CE643E4d4f530a66840F7f2AAa806FcE7C960'

  const contractAddress = '0xABbbaF21B366e27DFe65d7347cDa5D7C007acdd5'

  

  let { state, send } = useContractFunction(contract, "increaseCollateralAmount", { transactionName: "increaseCollateralAmount", signer: signer })


  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  }

  const handleAddCollatClick = () => {

    console.log(contract)
    send(SUSD_ADDR, "1000000")

  }

  const maxaddcollatvalue = 1000

  return (
    <Box pt={6} pb={2}>
  
      Add collateral:
      <NumberInput position="absolute" width="370px" size="sm" defaultValue={15} max={maxaddcollatvalue} value={addcollatvalue} onChange={(val) => setaddcollatvalue(val)}>
        <HStack justifyContent='space-between' spacing="20px" width="230px">
        <NumberInputField /><Button size="sm" right="80px" position="absolute" colorScheme="green" variant="outline" onClick={handleAddCollatClick} isDisabled='true'>Add</Button>
        </HStack>
      
      </NumberInput>
      <Slider alignContent="flex-start" mt="50px" minW="130px" aria-label='slider-ex-6' max={maxaddcollatvalue} value={addcollatvalue} onChange={(val) => setaddcollatvalue(val)}>


          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        
      </Slider>
    </Box>
  )
}

function RemoveCollat({contract, signer}) {
  const [addcollatvalue, setaddcollatvalue] = useState(0)

  const SUSD_ADDR = '0xd67CE643E4d4f530a66840F7f2AAa806FcE7C960'

  const contractAddress = '0xABbbaF21B366e27DFe65d7347cDa5D7C007acdd5'

  

  let { state, send } = useContractFunction(contract, "increaseCollateralAmount", { transactionName: "increaseCollateralAmount", signer: signer })


  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  }

  const handleAddCollatClick = () => {

    console.log(contract)
    send(SUSD_ADDR, "1000000")

  }

  const maxaddcollatvalue = 1000

  return (
    <Box pt={6} pb={2}>
  
      Remove collateral:
      <NumberInput position="absolute" width="370px" size="sm" defaultValue={15} max={maxaddcollatvalue} value={addcollatvalue} onChange={(val) => setaddcollatvalue(val)}>
        <HStack justifyContent='space-between' spacing="20px" width="230px">
        <NumberInputField /><Button size="sm" right="50px" position="absolute" colorScheme="red" variant="outline" onClick={handleAddCollatClick} isDisabled='true'>Remove</Button>
        </HStack>
      
      </NumberInput>
      <Slider alignContent="flex-start" mt="50px" minW="130px" aria-label='slider-ex-6' max={maxaddcollatvalue} value={addcollatvalue} onChange={(val) => setaddcollatvalue(val)}>


          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        
      </Slider>
    </Box>
  )
}



function RepayLoan({contract, signer}) {
  const [addcollatvalue, setaddcollatvalue] = useState(0)

  const SUSD_ADDR = '0xd67CE643E4d4f530a66840F7f2AAa806FcE7C960'

  const contractAddress = '0xABbbaF21B366e27DFe65d7347cDa5D7C007acdd5'

  

  let { state, send } = useContractFunction(contract, "increaseCollateralAmount", { transactionName: "increaseCollateralAmount", signer: signer })


  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  }

  const handleAddCollatClick = () => {

    console.log(contract)
    send(SUSD_ADDR, "1000000")

  }

  const maxaddcollatvalue = 1000

  return (
    <Box pt={6} pb={2}>
  
      Repay loan:
      <NumberInput position="absolute" width="382px" size="sm" defaultValue={15} max={maxaddcollatvalue} value={addcollatvalue} onChange={(val) => setaddcollatvalue(val)}>
        <HStack justifyContent='space-between' spacing="20px" width="230px">
        <NumberInputField /><Button size="sm" right="80px" position="absolute" colorScheme="green" variant="outline" onClick={handleAddCollatClick} isDisabled='1'>Repay</Button>
        </HStack>
      
      </NumberInput>
      <Slider alignContent="flex-start" mt="50px" minW="130px" aria-label='slider-ex-6' max={maxaddcollatvalue} value={addcollatvalue} onChange={(val) => setaddcollatvalue(val)}>


          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        
      </Slider>
    </Box>
  )
}