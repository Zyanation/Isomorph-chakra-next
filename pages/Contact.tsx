import React from 'react'
import { Container, Flex, VStack, Box, Heading, Text, SimpleGrid, GridItem, FormControl, FormLabel, Input, Select,
Checkbox, Button, HStack, useColorModeValue, useColorMode, useBreakpointValue} from '@chakra-ui/react';

import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
  } from '@chakra-ui/react'


  import {
    IconButton,
    InputGroup,
    InputLeftElement,
    Link,
    Stack,
    Textarea,
    Tooltip,
    useClipboard
  } from '@chakra-ui/react';

  import { BsGithub, BsLinkedin, BsPerson, BsTwitter } from 'react-icons/bs';
  import { MdEmail, MdOutlineEmail } from 'react-icons/md';
  
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
  const CONFETTI_DARK = `url("data:image/svg+xml,%3Csvg width='84' height='48' viewBox='0 0 84 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h12v6H0V0zm28 8h12v6H28V8zm14-8h12v6H42V0zm14 0h12v6H56V0zm0 8h12v6H56V8zM42 8h12v6H42V8zm0 16h12v6H42v-6zm14-8h12v6H56v-6zm14 0h12v6H70v-6zm0-16h12v6H70V0zM28 32h12v6H28v-6zM14 16h12v6H14v-6zM0 24h12v6H0v-6zm0 8h12v6H0v-6zm14 0h12v6H14v-6zm14 8h12v6H28v-6zm-14 0h12v6H14v-6zm28 0h12v6H42v-6zm14-8h12v6H56v-6zm0-8h12v6H56v-6zm14 8h12v6H70v-6zm0 8h12v6H70v-6zM14 24h12v6H14v-6zm14-8h12v6H28v-6zM14 8h12v6H14V8zM0 8h12v6H0V8z' fill='%23${confetti.dark.primary}' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`;
  
  export default function Contact() {
    const { hasCopied, onCopy } = useClipboard('example@example.com');
  
    return (
      <Flex
        bg={useColorModeValue('gray.100', 'gray.900')}
        align="center"
        justify="center"
        mb="-100px"
        css={{
          backgroundImage: useColorModeValue(CONFETTI_LIGHT, CONFETTI_DARK),
          backgroundAttachment: 'fixed',
        }}
        id="contact">
        <Box
          borderRadius="lg"
          m={{ base: 5, md: 16, lg: 10 }}
          p={{ base: 5, lg: 16 }}>
          <Box>
            <VStack spacing={{ base: 4, md: 8, lg: 20 }}>
              <Heading
                
                fontSize={{
                  base: '4xl',
                  md: '5xl',
                }}>
                Get in Touch
              </Heading>
  
              <Stack
                spacing={{ base: 4, md: 8, lg: 20 }}
                direction={{ base: 'column', md: 'row' }}>
                <Stack
                  align="center"
                  justify="space-around"
                  direction={{ base: 'row', md: 'column' }}>
                  <Tooltip
                    label={hasCopied ? 'Email Copied!' : 'Copy Email'}
                    closeOnClick={false}
                    hasArrow>
                    <IconButton
                      aria-label="email"
                      variant="ghost"
                      size="lg"
                      fontSize="3xl"
                      icon={<MdEmail />}
                      _hover={{
                        bg: 'blue.500',
                        color: useColorModeValue('white', 'gray.700'),
                      }}
                      onClick={onCopy}
                      isRound
                    />
                  </Tooltip>
  
                  <Link href="#">
                    <IconButton
                      aria-label="github"
                      variant="ghost"
                      size="lg"
                      fontSize="3xl"
                      icon={<BsGithub />}
                      _hover={{
                        bg: 'blue.500',
                        color: useColorModeValue('white', 'gray.700'),
                      }}
                      isRound
                    />
                  </Link>
  
                  <Link href="#">
                    <IconButton
                      aria-label="twitter"
                      variant="ghost"
                      size="lg"
                      icon={<BsTwitter size="28px" />}
                      _hover={{
                        bg: 'blue.500',
                        color: useColorModeValue('white', 'gray.700'),
                      }}
                      isRound
                    />
                  </Link>
  
                  <Link href="#">
                    <IconButton
                      aria-label="linkedin"
                      variant="ghost"
                      size="lg"
                      icon={<BsLinkedin size="28px" />}
                      _hover={{
                        bg: 'blue.500',
                        color: useColorModeValue('white', 'gray.700'),
                      }}
                      isRound
                    />
                  </Link>
                </Stack>
  
                <Box
                  bg={useColorModeValue('white', 'gray.700')}
                  borderRadius="lg"
                  p={8}
                  color={useColorModeValue('gray.700', 'whiteAlpha.900')}
                  shadow="base">
                  <VStack spacing={5}>
                    <FormControl isRequired>
                      <FormLabel>Name</FormLabel>
  
                      <InputGroup>
                        <InputLeftElement>
                            <BsPerson></BsPerson>
                        </InputLeftElement>
                        <Input type="text" name="name" placeholder="Your Name" />
                      </InputGroup>
                    </FormControl>
  
                    <FormControl isRequired>
                      <FormLabel>Email</FormLabel>
  
                      <InputGroup>
                        <InputLeftElement>
                            <MdOutlineEmail>
                            </MdOutlineEmail>
                        </InputLeftElement>
                        <Input
                          type="email"
                          name="email"
                          placeholder="Your Email"
                        />
                      </InputGroup>
                    </FormControl>
  
                    <FormControl isRequired>
                      <FormLabel>Message</FormLabel>
  
                      <Textarea
                        name="message"
                        placeholder="Your Message"
                        rows={6}
                        resize="none"
                      />
                    </FormControl>
  
                    <Button
                      colorScheme="purple"
                      bg="purple.400"
                      color="white"
                      _hover={{
                        bg: 'purple.500',
                      }}
                      isFullWidth>
                      Send Message
                    </Button>
                  </VStack>
                </Box>
              </Stack>
            </VStack>
          </Box>
        </Box>
      </Flex>
    );
  }