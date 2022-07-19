import React, { useEffect } from 'react'
import {useState} from 'react'
import { Kovan, DAppProvider, useEtherBalance, useTokenBalance, useEthers, Config, useCall, CallResult, useContractFunction } from '@usedapp/core'
import { utils, ethers, Signer, BigNumber } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import wait from 'wait'
import util, { isObject } from 'util'
import CollatList from "../components/CollatList.json"

import { HandleLoadDashboardValues } from '../components/HandleLoadDashboardValues'
import { PersonalPositions } from '../components/PersonalPositions'
import { ManagePositions, EmptyManagePositions } from '../components/ManagePositions'

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

  let gen_ABI = ["function approve(address _spender, uint256 _value) public returns (bool success)", "function allowance(address owner, address spender)"]
  let price_ABI = ["function priceCollateralToUSD(bytes32, uint256, uint256) public view returns (uint256)"];
  let SNXprice_ABI = ["function effectiveValue(bytes32, uint256, bytes32) public view returns (uint256)"];

  const toast = useToast()
  const MOUSD_ADDR = '0x2a622f65D4468d03Cb0b28Ff19BbE4C68C704f0a' //new
  const SUSD_ADDR = '0xaA5068dC2B3AADE533d3e52C6eeaadC6a8154c57'  //new
  const LYRA_ADDR = '0xf4f4Bb8D73A5eB5a8586E77dDb334C16AB30ff6A'


  const collatbookAddress = '0x81a024d18Ab348065FC075e5B941E8dCdae7c016' //not implemented
  const contractAddress = '0xD4e9503C91E2D426c8a95CF966DA3f8F31fBcb93'
  const treasuryAddress = '0x10cb54E115aa6D05dB87299b6f0E49224Cac7963' //not implemented

  const SNXpriceAddress = "0x37488De9A5Eaf311840D4B21a5B35A16bcb69603";

  const mousdInterface = new utils.Interface(mousd_abi)
  
  const { account, chainId } = useEthers()
  const [signer, setSigner] = useState(null);

  // const etherBalance = useEtherBalance(account)

  const handleGetSigner = async () => {
    try {
      console.log("huh")
      let tempProvider = new ethers.providers.Web3Provider(window.ethereum)
      const newsigner = tempProvider.getSigner()
      setSigner(newsigner)

      console.log("signer", signer)
    } catch (err) {
      console.log(err)
    }

  }


  const confetti = {
    light: {
      primary: 'BEE3F8', // blue.400
      secondary: 'BEE3F8', // blue.100
    },
  
    dark: {
      primary: '1A365D', // blue.900
      secondary: '2A4365', // blue.800
    },
  };
  
  const CONFETTI_LIGHT = `url("data:image/svg+xml,%3Csvg width='84' height='48' viewBox='0 0 84 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h12v6H0V0zm28 8h12v6H28V8zm14-8h12v6H42V0zm14 0h12v6H56V0zm0 8h12v6H56V8zM42 8h12v6H42V8zm0 16h12v6H42v-6zm14-8h12v6H56v-6zm14 0h12v6H70v-6zm0-16h12v6H70V0zM28 32h12v6H28v-6zM14 16h12v6H14v-6zM0 24h12v6H0v-6zm0 8h12v6H0v-6zm14 0h12v6H14v-6zm14 8h12v6H28v-6zm-14 0h12v6H14v-6zm28 0h12v6H42v-6zm14-8h12v6H56v-6zm0-8h12v6H56v-6zm14 8h12v6H70v-6zm0 8h12v6H70v-6zM14 24h12v6H14v-6zm14-8h12v6H28v-6zM14 8h12v6H14V8zM0 8h12v6H0V8z' fill='%23${confetti.light.primary}' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`;
  const CONFETTI_DARK = `background-color: #2a4365;
  background-image: url("data:image/svg+xml,%3Csvg width='32' height='64' viewBox='0 0 32 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 28h20V16h-4v8H4V4h28v28h-4V8H8v12h4v-8h12v20H0v-4zm12 8h20v4H16v24H0v-4h12V36zm16 12h-4v12h8v4H20V44h12v12h-4v-8zM0 36h8v20H0v-4h4V40H0v-4z' fill='%231a365d' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E");`
  
  
  const UIcolor = useColorModeValue('gray.100', 'blackAlpha.700')

 

  // const contract = new Contract(contractAddress, mousdInterface)

  const provider = new ethers.providers.InfuraProvider("optimism-kovan", process.env.NEXT_PUBLIC_KOVAN_INFURA);
  const contract_provider = new ethers.Contract(contractAddress, mousd_abi, provider);


  const contract_provider_withprice = new ethers.Contract(contractAddress, price_ABI, provider);
  const snxcontract_provider = new ethers.Contract(SNXpriceAddress, SNXprice_ABI, provider);

  const contract_signer = new ethers.Contract(contractAddress, mousd_abi, signer);

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

  const [ADDR, setADDR] = useState("")
  const collatBalance = useTokenBalance(ADDR, account)


  const [isDisabled, setDisabled] = useState(false);


  const [ loanval, setloanval ] = useState(0)
  const [ collateralPosted, setcollateralPosted ] = useState(0)


  const [ SUSDPostedDisplay, setSUSDPostedDisplay ] = useState('')
  const [ SUSDLoanDisplay, setSUSDLoanDisplay ] = useState('')
  const [ SUSDValueDisplay, setSUSDValueDisplay ] = useState('')

  const [ EthPostedDisplay, setEthPostedDisplay ] = useState('')
  const [ EthLoanDisplay, setEthLoanDisplay ] = useState('')
  const [ EthValueDisplay, setEthValueDisplay ] = useState('')

  const [ LyraLPPostedDisplay, setLyraLPPostedDisplay ] = useState('')
  const [ LyraLPLoanDisplay, setLyraLPLoanDisplay ] = useState('')
  const [ LyraValueDisplay, setLyraValueDisplay ] = useState('')


  

  const getLoanvalue = async () => {
    const loanval = await contract_provider.moUSDLoaned(ADDR, account)
    setloanval(loanval)
  
    console.log("got loanval", utils.formatEther(loanval))
  }

  const getCollatvalue = async () => {
    const _val = await contract_provider.collateralPosted(ADDR, account)
    setcollateralPosted(_val)
  
  }

  const SYNTH = "0";
  const LYRA = "1";

  const getCollatprice = async () => {
    const _price = await contract_provider.priceCollateralToUSD(ADDR, collateralPosted, SYNTH)
  }

 
  const [selectedCollatReadableBalance, setSelectedCollatReadableBalance] = useState("")


  const [SelectedCollatFromInput, setSelectedCollatFromInput] = useState("")

  const getWalletCollatBalance = async (_SelectedCollatFromInput) => {

    const collatSelected = CollatList[`${_SelectedCollatFromInput}`]

    if(!collatSelected) {

      setSelectedCollatFromInput("")

      toast({
        position: 'bottom',
        title: 'Coming soon',
        description: `Sorry, but we currently do not support ${_SelectedCollatFromInput} yet :(`,
        status: 'warning',
        duration: 4000,
        isClosable: true,
      })
      return;

    }

    const changeCollateral = async (_name, _address) => {

      console.log(_name)

      setisLoading(true)
      setADDR(_address)
      setSelectedCollatFromInput(_name)

    }

    changeCollateral(collatSelected.name, collatSelected.address);

   
  }




  useEffect(() => {

    if (!account) return


    //if there isn't yet a valid selected collat input, and if a contract address exists
    if (SelectedCollatFromInput != undefined && ADDR) {

      const _handlecollatforminput = async () => {
        setisLoading(true)

        //Prepare for contract methods and contract instance
        let temp_contract = new ethers.Contract(ADDR, gen_ABI, signer);

        await handleGetSigner()
        setisLoading(true)
        await setMethod("approve")
        await setContract(temp_contract)


        //set collateral states
        const walletcollatval = contract_provider.collateralPosted(contractAddress, ADDR)
        await setcollateralPosted(walletcollatval)
        await setselectedCollatName(SelectedCollatFromInput)
        console.log("selected collat input", SelectedCollatFromInput)


        

  

      }



      _handlecollatforminput()

    

    } 
    
    else {
      setcollateralPosted(0)
      setSelectedCollatReadableBalance(0)
      setselectedCollatName("")
      


    }

    console.log("LyraLPLoanDisplay", LyraLPLoanDisplay)



  }, [SelectedCollatFromInput])





  let contract = new ethers.Contract(CollatList.susd.address, gen_ABI, signer);

  const [useContract, setContract] = useState()
  const [useMethod, setMethod] = useState("")

  let { state, send } = useContractFunction(useContract, useMethod, { transactionName: useMethod, signer: signer })

  const handleapprove = async () => {
    console.log(signer)
   

      send(contractAddress, "1000000000000000000000000000000000000000")


   
    
  
}

const [sliderValue, setSliderValue] = useState(50)
const [loanslidervalue, setloanslidervalue] = useState(50)

  const handleOpenloanclick = async () => {

    handleGetSigner()

    setDisabled(true)

    console.log(sliderValue, typeof(sliderValue))
    console.log(loanslidervalue, typeof(loanslidervalue))

    console.log(utils.parseUnits(sliderValue.toString()), utils.parseUnits(loanslidervalue.toString()))
    
    await setMethod("openLoan")
    await setContract(contract_provider)

    // console.log("sdsd", typeof(utils.parseUnits(sliderValue.toString())), typeof(utils.parseUnits(loanval)))
    // console.log(utils.parseUnits(sliderValue.toString()), utils.parseUnits(loanslidervalue.toString()))

    console.log(signer, "confirm loan")
    send(ADDR, utils.parseUnits(sliderValue.toString()), utils.parseUnits(loanslidervalue.toString()))



 

  }
  
  const [selectedCollatName, setselectedCollatName ] = useState("")

// Left dashboard / Position management, will update everytime a new collateral is selected,
// account detected, or when signer is obtained.

  useEffect(()=>{
    
    if(!account || !selectedCollatName) return



      console.log("ADDR", ADDR)

      if(!signer) {
        setisLoading(true)
        handleGetSigner()
      }
    
    
      if (collatBalance == null) {
        setisLoading(true)
      }

      if(collatBalance) {
        setSelectedCollatReadableBalance(utils.formatUnits(collatBalance))
      }
      
  
      getLoanvalue()
      getCollatvalue()

      setisLoading(false)


    
   

  
  }, [selectedCollatName, account, signer])






  // Dashboard / Personal positions, will only load once.

  useEffect(() => {

    if(!signer){
      handleGetSigner()
    }

    

 
    // if there's no value of collateral posted yet
    if(account && contract_provider && contract_provider_withprice){

      //set up a for loop here that loops through collat list

      console.log("contract_provider_withprice", contract_provider_withprice)
      HandleLoadDashboardValues(account, contract_provider, contract_provider_withprice, snxcontract_provider, setSUSDLoanDisplay, setSUSDPostedDisplay, setSUSDValueDisplay, CollatList.susd.address)

      // HandleLoadDashboardValues(account, contract_provider, setEthLoanDisplay, setEthPostedDisplay, CollatList.susd.address)
      HandleLoadDashboardValues(account, contract_provider, contract_provider_withprice, snxcontract_provider, setLyraLPLoanDisplay, setLyraLPPostedDisplay, setLyraValueDisplay, LYRA_ADDR)


    }
    


  }, [account, state])


  


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
        title: 'Error',
        description: "Transaction reverted",
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }

  }, [state.status])



  // handle wrong chain events

  useEffect(() => {

    if(chainId != 69)
    {
      toast({
        position: 'top',
        title: 'Wrong network',
        description: "Please switch to Optimistic Kovan",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }

  }, [chainId])

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

function someFunc () {
  console.log()
  handleOpenloanclick()
}

  

  return (
    <>



    {/* main box */}
    <Flex
    
    css={{
      backgroundImage: useColorModeValue(CONFETTI_LIGHT, CONFETTI_DARK),
      backgroundAttachment: 'fixed',
    }}
    flexDir="row"
    maxW={1900}
    w={[300, 500, 1900]}
    align="center"
    justify="center"
    minH="80vh"
    mx="auto"
    mb="-10vh"
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
        px={4}
        backgroundColor={useColorModeValue('gray.100', 'blackAlpha.700')}
        rounded='lg'
        

        >
            <Box w={[150, 300, 500]} h="100px" mt="3vh" p="20px" rounded='lg'>
              <VStack px="10px" w="fill" h="65vh" mb="10px" bgColor={useColorModeValue('gray.100', 'blackAlpha.100')} alignItems="flex-start">
                  <Heading size="md" mt="10px" mb="10px">Open position</Heading><Divider />
                  {/* <Image src="./images/susd.png"></Image> */}
          
                  <Select borderColor={useColorModeValue('blackAlpha.100', 'gray.300')} size="lg" placeholder='Select collateral' onChangeCapture={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    // e.preventDefault()
                    console.warn('onChange TextInput value: ' + e.target.value);
                    getWalletCollatBalance(e.target.value)
                  }}>


                  {Object.entries(CollatList).map(([key, value]) => {
                    return (
                    <>
                    <option value={value.name}>
                      {value.fullname}
                    </option>


                    </>
                    )

                  })}

                  {/* <option value='susd'>sUSD</option>
                  <option value='seth'>Ethereum</option>
                  <option value='lyralp'>Lyra LP tokens</option> */}

                  
                  </Select>
                  { SelectedCollatFromInput && account ?
                  <Button alignSelf="center" colorScheme="green" isLoading={isLoading || signer ? isLoading : false} onClick={handleapprove}>Approve</Button>
                  :
                  <Button alignSelf="center" colorScheme="green" isDisabled={true} onClick={handleapprove}>Approve</Button>

                  }
                  
                  <Divider />


            
                
                <SlidebarCollateral 
                selectedCollatReadableBalance={selectedCollatReadableBalance}
                 sliderValue={sliderValue} 
                 setSliderValue={setSliderValue}
                 loanslidervalue={loanslidervalue}
                 setloanslidervalue={setloanslidervalue}
                 />

                {/* {SlidebarCollateral(
                  {selectedCollatReadableBalance : selectedCollatReadableBalance,
                    sliderValue : sliderValue,
                    setSliderValue : setSliderValue,
                    loanslidervalue : loanslidervalue,
                    setloanslidervalue : setloanslidervalue
                  }
                )} */}
                


            

              <SlidebarLoan 
              sliderValue={sliderValue} 
              loanslidervalue={loanslidervalue} 
              setloanslidervalue={setloanslidervalue}
              ></SlidebarLoan>

              <Text pt="10vh" pb="10vh"> <br></br><br></br>
                 <br></br>
                
              </Text>
              
              </VStack>

              <HStack spacing="20px" justifyContent="flex-end">
                    <Button colorScheme="red">Cancel</Button>
                    <Button colorScheme="green" 
                    onClick={
                      someFunc
                    } isLoading={isLoading}
                    isDisabled={signer && chainId == 69 && account && selectedCollatName == "susd" || selectedCollatName == "lyralp" ? false : true}>Confirm</Button>
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
        mb="5vh"
        px={4}
        overflowX="auto"
        >
          <Box mt="3vh" rounded='lg' bgColor={useColorModeValue('gray.100', 'blackAlpha.700')}>
          <TableContainer rounded='lg' mt={5} w="120vh">
            <Table variant='simple' colorScheme='facebook' size="md" pos="static">
                <Thead>
                    <Tr><Th><Heading size="sm">Personal Positions</Heading></Th></Tr>
                </Thead>
                


                {/* Entire personal loan position goes here!! */}

                <PersonalPositions 
                account={account}
                _LoanDisplay={SUSDLoanDisplay}
                _PostedDisplay={SUSDPostedDisplay}
                _CollatPriceDisplay={SUSDValueDisplay}
                ethersToNum={ethersToNum}
                CollatName="sUSD"
                />


                  </Table>
                  </TableContainer>
                  </Box>




                  {/* Manage loan position!! */}
                  {signer ? 
                  
                                          

                                          <ManagePositions 
                                          ADDR={CollatList.susd.address}
                                          UIcolor={UIcolor}
                                          contract_signer={contract_signer}
                                          signer={signer} 
                                          
                                          
                                          />

                                          :

                                          <>
        

                                          <EmptyManagePositions 
                                          UIcolor={UIcolor}
                                          />
                                          
                                          </>
                
                }

                  {/* Lyra's part dashboard*/}

                {LyraLPLoanDisplay != '0' && signer ? 
                <>

          <Box mt="3vh" rounded='lg' bgColor={UIcolor}>
          <TableContainer rounded='lg' mt={5} w="120vh">
            <Table variant='simple' colorScheme='facebook' size="md" pos="static">
  

                                  <PersonalPositions 
                                  account={account}
                                  _LoanDisplay={LyraLPLoanDisplay}
                                  _PostedDisplay={LyraLPPostedDisplay}
                                  _CollatPriceDisplay={LyraValueDisplay}
                                  ethersToNum={ethersToNum}
                                  CollatName="LyraLP"
                                  />


                  </Table>
                  </TableContainer>
                  </Box>
               
                </> 
                : 
                <> 

                {/* //This should contain nothing */}
                </>}


                      {/* Manage loan position for lyra!! */}
                      {LyraLPLoanDisplay != '0' && signer ? 
                  
                                          

                  <ManagePositions 
                  ADDR={LYRA_ADDR}
                  UIcolor={UIcolor}
                  contract_signer={contract_signer}
                  signer={signer} 
                  
                  
                  />

                  :

                  <>    
                  </>

}

{LyraLPLoanDisplay != '0' && signer ? 
                <>

          <Box mt="3vh" rounded='lg' bgColor={UIcolor}>
          <TableContainer rounded='lg' mt={5} w="120vh">
            <Table variant='simple' colorScheme='facebook' size="md" pos="static">
  

                                  <PersonalPositions 
                                  account={account}
                                  _LoanDisplay={LyraLPLoanDisplay}
                                  _PostedDisplay={LyraLPPostedDisplay}
                                  _CollatPriceDisplay={EthValueDisplay}
                                  ethersToNum={ethersToNum}
                                  CollatName="Mock ETH"
                                  />


                  </Table>
                  </TableContainer>
                  </Box>
               
                </> 
                : 
                <> 

                {/* //This should contain nothing */}
                </>}


                      {/* Manage loan position for lyra!! */}
                      {EthLoanDisplay != '0' && false && signer ? 
                  
                                          

                  <ManagePositions 
                  ADDR={LYRA_ADDR}
                  UIcolor={UIcolor}
                  contract_signer={contract_signer}
                  signer={signer} 
                  
                  
                  />

                  :

                  <>    
                  </>

}














        </Flex>
      
      </Flex>

    </>
  )
}

export default Dashboard


function SlidebarCollateral({selectedCollatReadableBalance, sliderValue, setSliderValue, loanslidervalue, setloanslidervalue}) {
  

  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  }

  return (
    <Box pt={6} pb={2}>
        <Heading mb="15px" size="sm">Collateral amount :</Heading>
        
      <NumberInput position="absolute" width="500px" size="md" defaultValue={15} 
      max={selectedCollatReadableBalance ? selectedCollatReadableBalance : "1000"} 
      value={sliderValue ? sliderValue : 0} 
      onChange={(val) => {
        
        
        setSliderValue(val)

        if(val < loanslidervalue) {
          setloanslidervalue(val)
        }
        
        
        
        }}>
        <HStack justifyContent='space-between' spacing="20px" width="430px">
        <NumberInputField />
        <Button size="sm" right="80px" position="absolute" colorScheme="red" variant="outline" 
        onClick={()=> {setSliderValue(selectedCollatReadableBalance)}}>Max</Button>
        </HStack>
      
      </NumberInput>
      <Slider alignContent="flex-start" mt="50px" minW="380px" aria-label='slider-ex-6' 
      max={selectedCollatReadableBalance ? selectedCollatReadableBalance : "1000"} 
      value={sliderValue ? sliderValue : 0} 
      onChange={(val) => {
        setSliderValue(val)

        if(val < loanslidervalue) {
          setloanslidervalue(val)
        }
        
        }}>
 

          <SliderTrack>
            <SliderFilledTrack bg='purple.400'/>
          </SliderTrack>
          <SliderThumb />
        
      </Slider>
    </Box>
  )
}


function SlidebarLoan({sliderValue, loanslidervalue, setloanslidervalue}) {
  



  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  }

  return (
    <Box pt={6} pb={2}>
      <Heading mb="15px" size="sm">Loan amount: </Heading>
      <NumberInput width="10px" size="md" 
      defaultValue={15} 
      max={sliderValue} 
      value={loanslidervalue ? loanslidervalue : 0} 
      onChange={(val) => setloanslidervalue(val)}>
        <HStack justifyContent='space-between' width="430px">
        <NumberInputField />
        </HStack>
      
      </NumberInput>
      <Slider width="400px" aria-label='slider-ex-6' max={sliderValue} onChange={(val) => setloanslidervalue(val)}>
 
  <SliderTrack>
    <SliderFilledTrack bg='purple.400'/>
  </SliderTrack>
  <SliderThumb />
</Slider>
    </Box>
  )
}


