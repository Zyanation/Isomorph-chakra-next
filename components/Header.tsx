import { Mainnet, DAppProvider, useEtherBalance, useEthers, Config } from '@usedapp/core'

import { useState, useEffect } from "react";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";
import { formatEther } from "@ethersproject/units";

import NextLink from 'next/link'

import {
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
  const etherBalance = useEtherBalance(account)


  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
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
          <Image boxSize='40px' src="/images/1-logo_11-logo.png" alt='Isomorph'>

          </Image>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}>
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
            fontWeight={400}
            variant={'link'}
            href={'#'}>
            Sign In
          </Button>
          




            <Box>{account && <p>Account: {account}</p>}</Box>
            <Button
            onClick={() => activateBrowserWallet()}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'green.400'}
            href={'#'}
            _hover={{
              bg: 'green.300',
            }}>
            Connect Wallet
          </Button>
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


  return (


    <Stack direction={'row'} spacing={4}>


          <NextLink href="/Homepage"><a className="nav-link">Homepage</a></NextLink>
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
            <a className="nav-link">Dashboard</a>
          </NextLink>
            <a href="https://optimism.curve.fi/" className="nav-link">TRADE MOUSD</a>
            <a href="/#" className="nav-link">BUG BOUNTY</a>
          <a href="/#" className="nav-link">CONTACT US</a>


      
    </Stack>
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
