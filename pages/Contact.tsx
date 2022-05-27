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



const Contact = () => {

   
    const bgColor = useColorModeValue("red.200", "whiteAlpha.50")
    const colSpan = useBreakpointValue({base: 2, md: 1})

  return (
    <Container 
    maxWidth='container.xl'
    padding='0'
    >
            <Flex h="100vh"
                py={20}
            >
                    <VStack backgroundColor={bgColor}
                            w="full"
                            h="full"
                            p={10}
                            spacing={10}
                            alignItems="flex-start"
                    >
                        <VStack spacing={3}
                                alignItems="flex-start">
                            <Heading size="2xl">
                                Your details
                            </Heading>
                            <Text>If you already have an account, click here to login</Text>
                        </VStack>

                        <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
                            <GridItem colSpan={colSpan}>
                                <FormControl>
                                    <FormLabel>First Name</FormLabel>
                                    <Input placeholder="John" />
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={1}>
                                <FormControl>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input placeholder="Doe" />
                                </FormControl>
                            </GridItem>

                            <GridItem colSpan={2}>
                                <FormControl>
                                    <FormLabel>Address</FormLabel>
                                    <Input placeholder="Some address" />
                                </FormControl>
                            </GridItem>

                            <GridItem colSpan={1}>
                                <FormControl>
                                    <FormLabel>City</FormLabel>
                                    <Input placeholder="San Francisco" />
                                </FormControl>
                            </GridItem>

                            <GridItem colSpan={1}>
                                <FormControl>
                                    <FormLabel>Country</FormLabel>
                                    <Select>
                                        <option value="usa">United States of America</option>
                                        <option value="uae">United Arab Emirates</option>
                                    </Select>
                                </FormControl>
                            </GridItem>

                            <GridItem colSpan={2}>
                                <Checkbox defaultChecked>
                                    Ship to billing address
                                </Checkbox>
                            </GridItem>

                            <GridItem colSpan={2}>
                                <Button size="lg" w="full">
                                    Place order
                                </Button>
                            </GridItem>

                        </SimpleGrid>


                    </VStack>











                    <VStack 
                            w="full"
                            h="full"
                            p={10}
                            spacing={10}
                            alignItems="flex-start"
                            bg="gray.400">

                    <VStack alignItems="flex-start" w="full">
                            <Heading>
                                Your cart

                                <Slider defaultValue={60} min={0} max={300} step={30}>
                                <SliderTrack bg='red.100'>
                                    <Box position='relative' right={10} />
                                    <SliderFilledTrack bg='tomato' />
                                </SliderTrack>
                                <SliderThumb boxSize={6} />
                                </Slider>
                            </Heading>
                            <Box>
                                <Text>
                                    if price is too hard on your eyes, <b>try changing the theme.</b>
                                </Text>
                                
                            </Box>

                            <Flex w="full" h={40} bg="gray.700" m={5}>
                                <HStack w="full" h={40} bg="gray.300" alignItems="flex-start" spacing={2}>
                                    <Box w="120px" h="full" bg="red"></Box>
                                    <VStack alignItems="flex-start" alignSelf="center" p={2}>
                                        <Heading size="md">Pennyboard</Heading>
                                        <Text>PSDSAD34223</Text>
                                    </VStack>
                                </HStack>
                                <Flex flexDirection="row-reverse" alignSelf="center">
                                        <Text>$119.32</Text>
                                </Flex>
                            </Flex>

                            <VStack spacing={4} alignItems="stretch" w="full">
                                <HStack justifyContent='space-between'>
                                    <Text>why arent you showing up tho</Text>
                                    <Text>more text</Text>
                                </HStack>

                            </VStack>
   
                    </VStack>
                        

                    </VStack>
            </Flex>
      
    </Container>
  )
}

export default Contact