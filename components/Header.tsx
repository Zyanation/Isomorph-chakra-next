import { Mainnet, DAppProvider, useEtherBalance, useEthers, Config } from '@usedapp/core'

import { useState, useEffect } from "react";
import { Web3Provider } from "@ethersproject/providers";

import { formatEther } from "@ethersproject/units";

import NextLink from 'next/link'

import { PhoneIcon, AddIcon, WarningIcon, DeleteIcon } from '@chakra-ui/icons'

import {
  Container,
  HStack,
  VStack,
  Image,
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorMode,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon, 
  SunIcon
} from '@chakra-ui/icons';

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();

  
  const { colorMode, toggleColorMode } = useColorMode();

  const { account, deactivate, activateBrowserWallet} = useEthers()
  // const etherBalance = useEtherBalance(account)ss

  const [ short_account, setshort_account ] = useState()

  useEffect(()=> {
    if(account) {
    const _short_account : any = account.slice(0, 3) + "..." + account.slice(39, 42)
    setshort_account(_short_account)
    }
  }, [account])

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.700')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'70px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
        <NextLink href="/">
          <Image boxSize='40px' src="/images/1-logo_11-logo.png" alt='Isomorph'>
          </Image>
          </NextLink>
          <Text
            as="kbd"
            mt="10px"
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontWeight="bold"
            color="white">
            
            Isomorph
          </Text>
          

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>

          <Button
            as={'a'}
            fontSize={'sm'}
            fontWeight="bold"
            variant={'link'}
            href={'#'}>
            Sign In
          </Button>
          


        <HStack w="160px">
          {account ? 
          
          (
            <HStack w="160px">
            <Text fontSize='sm'><Text><b>Connected as:</b></Text> {short_account}</Text> 
            <Button
                  size='xs'
                  onClick={() => deactivate()}
                  colorScheme='pink'
                >
                  <DeleteIcon                   
                  w='10px'
                  h='10px'/>
            </Button>
            
            </HStack>

          
          ) 
          
          
          : (
          
          <><WalletConnect /></>)}

        </HStack>
        
            

            
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>


    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  const { isOpen, onToggle } = useDisclosure();

  const { colorMode, toggleColorMode } = useColorMode();

  const { account } = useEthers()
  // const etherBalance = useEtherBalance(account)




  return (
<>
    
      {/* <Button
        onClick={() => deactivate()}
        colorScheme='blue'
      >
        Click me
      </Button> */}

    <Stack direction={'row'} spacing={6} mt='10px'>



          <NextLink href="/#"><Link><Text fontWeight="bold" fontSize='14px'>ABOUT</Text></Link></NextLink>
            <NextLink className="nav-link" href={"./Dashboard"}
                // errorMessage = {errorMessage}
                // setErrorMessage =  {setErrorMessage}
                // defaultAccount =  {defaultAccount}
                // setDefaultAccount =  {setDefaultAccount}
                // connButtonText =  {connButtonText}
                // setConnButtonText =  {setConnButtonText}
                // provider =  {provider}
                // setProvider =  {setProvider}
                // signer =  {signer}
                // setSigner =  {setSigner}
                // contract =  {contract}
                // setContract =  {setContract}
                // contractAddress =  {contractAddress}
                // connectWalletHandler =  {connectWalletHandler}
                // accountChangedHandler =  {accountChangedHandler}
                // updateEthers =  {updateEthers}
                >
            <Link><Text fontWeight="bold" fontSize='14px'>DASHBOARD</Text></Link>
          </NextLink>
          
          <Link href="https://optimism.curve.fi/" isExternal><Text fontWeight="bold" fontSize='14px'>TRADE MOUSD</Text></Link>
          <NextLink href="/#"><Link><Text fontWeight="bold" fontSize='14px'>BUG BOUNTY</Text></Link></NextLink>
          <NextLink href="/Contact"><Link><Text fontWeight="bold" fontSize='14px'>CONTACT US</Text></Link></NextLink>

      
    </Stack>
    </>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Homepage',
    children: [
      {
        label: 'Explore Design Work',
        subLabel: 'Trending Design to inspire you',
        href: '#',
      },
      {
        label: 'New & Noteworthy',
        subLabel: 'Up-and-coming Designers',
        href: '#',
      },
    ],
  },
  {
    label: 'Market',
    children: [
      {
        label: 'Job Board',
        subLabel: 'Find your dream design job',
        href: '#',
      },
      {
        label: 'Freelance Projects',
        subLabel: 'An exclusive list for contract work',
        href: '#',
      },
    ],
  },
  {
    label: 'Dashboard',
    children: [
      {
        label: 'Job Board',
        subLabel: 'Find your dream design job',
        href: '#',
      },
      {
        label: 'Freelance Projects',
        subLabel: 'An exclusive list for contract work',
        href: '#',
      },
    ],
  },
  {
    label: 'Bug Bounty',
    href: '#',
  },
  {
    label: 'Contact Us',
    href: '#',
  },
];




const WalletConnect = () => {
  const { activateBrowserWallet} = useEthers()

  return (

    <Button
    w='160px'
    onClick={() => activateBrowserWallet()}
    display={{ base: 'none', md: 'inline-flex' }}
    fontSize={'sm'}
    fontWeight={700}
    letterSpacing={1}
    color={'white'}
    bg={'green.600'}
    _hover={{
      bg: 'green.500',
    }}>
    Connect Wallet
  </Button>
  )
}
