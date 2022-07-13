import { Mainnet, DAppProvider, useEtherBalance, useEthers, Config, ChainId } from '@usedapp/core'
import { signIn, signOut, useSession } from "next-auth/react"
import styles from "./header.module.css"

import { useState, useEffect } from "react";

import { formatEther } from "@ethersproject/units";
import { useRouter } from 'next/router';

import NextLink from 'next/link'

import { PhoneIcon, AddIcon, WarningIcon, DeleteIcon, CheckIcon, WarningTwoIcon } from '@chakra-ui/icons'

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



  const { data: session, status } = useSession()
  const loading = status === "loading"



  const { isOpen, onToggle } = useDisclosure();

  
  const { colorMode, toggleColorMode } = useColorMode();

  const { account, deactivate, activateBrowserWallet, chainId } = useEthers()
  // const etherBalance = useEtherBalance(account)ss

  const [ short_account, setshort_account ] = useState()

  useEffect(()=> {
    if(account) {
    const _short_account : any = account.slice(0, 3) + "..." + account.slice(39, 42)
    setshort_account(_short_account)
    }
  }, [account])

  // useEffect(() => {

    
    
  // }, [chainId])

  

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
            color={useColorModeValue('gray.800', 'white')}>
            
            Isomorph
          </Text>
          
          {/* Lefthand side Nav */}
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={7}>
          <Button m="auto" 
          onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>

          <Button
            color={useColorModeValue('gray.800', 'white.500')}
            as={'a'}
            bgColor={chainId == 69 ? "teal" : "red.700"}
            fontSize={'sm'}
            fontWeight={"bold"}
            variant={'solid'}
            >
            {chainId == 69 ? <><CheckIcon w={5} h={5} mr="5px" color="green.800" /><Text size="sm">Network : <b>Optimistic Kovan</b></Text></> 
            :

            <><WarningTwoIcon w={5} h={5} mr="5px" color="yellow.300" /><Text size="sm">Network : <b>{ChainId[chainId]}</b></Text></> 
             }
          </Button>
          
          

        <HStack w="160px">
          {account ? 
          
          (
            <HStack w="180px">
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

  const router = useRouter();


  return (
<>
    
      {/* <Button
        onClick={() => deactivate()}
        colorScheme='blue'
      >
        Click me
      </Button> */}

    <Stack direction={'row'} spacing={6} mt='3px'>



          <NextLink href="/#">
            {router.pathname == "/" ? <Button size="sm" fontWeight="bold" fontSize='14px' color="purple.400">ABOUT</Button>
            :
            <Button size="sm" fontWeight="bold" fontSize='14px' variant="ghost">ABOUT</Button>
            }
          </NextLink>

          <NextLink className="nav-link" href={"./Dashboard"}>
            {router.pathname == "/Dashboard" ? <Button size="sm" fontWeight="bold" fontSize='14px' color="purple.400">DASHBOARD</Button>
            :
            <Button size="sm" fontWeight="bold" fontSize='14px' variant="ghost">DASHBOARD</Button>
            }
          </NextLink>
          
          <Button size="sm" fontWeight="bold" fontSize='14px' variant="ghost">
          <a target='_blank' rel="noreferrer" href="https://optimism.curve.fi/">
          TRADE MOUSD
          </a>
          </Button>
          
          <NextLink href="/#">
            {router.pathname == "/BugBounty" ? 
            <Button size="sm" fontWeight="bold" fontSize='14px' color="purple.400">BUG BOUNTY</Button>
            :
            <Button size="sm" fontWeight="bold" fontSize='14px' variant="ghost" isDisabled={true}>BUG BOUNTY</Button>
            }
          </NextLink>

          <NextLink href="/Contact">
            {router.pathname == "/Contact" ? 
            <Button size="sm" fontWeight="bold" fontSize='14px' color="purple.400">CONTACT US</Button>
            :
            <Button size="sm" fontWeight="bold" fontSize='14px' variant="ghost">CONTACT US</Button>
            }
          </NextLink>

      
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
