import React from 'react'
import { ethers, utils } from 'ethers'

import {
    Table,
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

export const PersonalPositions = ({account, _LoanDisplay, _PostedDisplay, _CollatPriceDisplay, ethersToNum, CollatName, _Interest, _minOpeningMargin}) => {

  const LiquidationPercentCollat = 100/((_minOpeningMargin)*100)


  return (
    <div>


<Thead>
                  <Tr>
                    <Th>MoUSD loaned</Th>
                    <Th isNumeric>Value (USD)</Th>
                    <Th>Assets backing</Th>
                    <Th isNumeric>Value (USD)</Th>
                    <Th isNumeric>Liquidation price (USD)</Th>
                    <Th>Interest rate</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr height="100px">

                    {!account || _LoanDisplay == '0' || _CollatPriceDisplay == '0' || !_Interest ? 
                      <Box position="relative" alignSelf="center" left="350px" top="50px">No open positions</Box>
                  :
                    <>
                    <Td><StatNumber>{_LoanDisplay && ethersToNum(_LoanDisplay)} MOUSD</StatNumber></Td>
                    <Td><StatNumber>$ {_LoanDisplay && ethersToNum(_LoanDisplay)}</StatNumber></Td>
                    <Td><Text><StatNumber>{_PostedDisplay && ethersToNum(_PostedDisplay)} {CollatName}</StatNumber></Text></Td>
                    <Td isNumeric>{_CollatPriceDisplay && ethersToNum(_CollatPriceDisplay)}</Td>
                    <Td isNumeric>$ {_PostedDisplay && (ethersToNum(_PostedDisplay)*LiquidationPercentCollat).toFixed(2)}</Td>
                    <Td>{_Interest.toFixed(2)} %</Td>
                    </>
                  
                  }

                      

                    


                  </Tr>
                  </Tbody>



    </div>
  )
}

export default PersonalPositions