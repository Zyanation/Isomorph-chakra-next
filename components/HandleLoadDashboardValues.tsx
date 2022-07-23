import { utils, ethers } from 'ethers'

// account, contract_provider, contract_provider_withprice, snxcontract_provider, setPositionsState, collat.address)
export async function HandleLoadDashboardValues(account, contract_provider, contract_provider_withprice, snxcontract_provider, PositionsState, setPositionsState, key, value) {

  function convertBytes32 (_name) {
    if(!_name) return
    return utils.formatBytes32String(_name)
  }


  const bytes32code = convertBytes32(value.fullname);
  const sUSDCode = convertBytes32("sUSD");

    let cbook_ABI = ["function collateralProps(address _currency) public view returns (bytes32 currencyKey, uint256 minOpeningMargin, uint256 liquidatableMargin, uint256 interestPer3Min, uint256 lastUpdateTime, uint256 virtualPrice)"]
    const provider = new ethers.providers.InfuraProvider("optimism-kovan", process.env.NEXT_PUBLIC_KOVAN_INFURA);
    let temp_contract = new ethers.Contract("0x81a024d18Ab348065FC075e5B941E8dCdae7c016", cbook_ABI, provider);

    const collatstruct = await temp_contract.collateralProps(value.address)

    const minOpeningMargin = collatstruct[1]
    const interestPer3Min = collatstruct[3]

    console.log("interestPer3Min", interestPer3Min)


    



    

    // "name": "collateralProps",
    //     "outputs": [
    //       {
    //         "components": [
    //           {
    //             "internalType": "bytes32",
    //             "name": "currencyKey",
    //             "type": "bytes32"
    //           },
    //           {
    //             "internalType": "uint256",
    //             "name": "minOpeningMargin",
    //             "type": "uint256"
    //           },
    //           {
    //             "internalType": "uint256",
    //             "name": "liquidatableMargin",
    //             "type": "uint256"
    //           },
    //           {
    //             "internalType": "uint256",
    //             "name": "interestPer3Min",
    //             "type": "uint256"
    //           },
    //           {
    //             "internalType": "uint256",
    //             "name": "lastUpdateTime",
    //             "type": "uint256"
    //           },
    //           {
    //             "internalType": "uint256",
    //             "name": "virtualPrice",
    //             "type": "uint256"
    //           }

    //these return promises!
  
    console.log("before loanval", contract_provider, value.address, account)
    const _loanval = await contract_provider.moUSDLoaned(value.address, account)
    // const _loanval =  utils.parseEther("1111111")
    // const _collatval = utils.parseEther("11222211111")
    const _collatval = await contract_provider.collateralPosted(value.address, account)

    const SYNTH = 0;
    const LYRA = 1;

    // if(value.address == "0xaA5068dC2B3AADE533d3e52C6eeaadC6a8154c57") {
    //   bytes32 = sUSDCode;
    // }


    // const _price = await contract_provider_withprice.priceCollateralToUSD(sETHCode, utils.parseEther('1'), SYNTH)

    //change first one
    const _price = await snxcontract_provider.effectiveValue(bytes32code, _collatval, sUSDCode)




    // _setLoanDisplay(_loanval.mul(100000))
    // _setPostedDisplay(_collatval.mul(100000))
    // _setCollatPriceDisplay(_price.mul(100000))

    PositionsState[key].loandisplay = _loanval.mul(1000)
    PositionsState[key].collatposteddisplay = _collatval.mul(1000)
    PositionsState[key].collatvaluedisplay = _price.mul(1000)

    if(!interestPer3Min.isZero()) {
  
      const eq = utils.formatEther(interestPer3Min)
      
      const rawinterestRate = Math.pow(eq, (365*24*20))
      const interestRate = rawinterestRate * 100 - 100
      PositionsState[key].interest = interestRate
    }

    console.log("interestttttt", interestPer3Min)



      // const DisplayminOpeningMargin = utils.parseEther(minOpeningMargin.toString())
      PositionsState[key].minOpeningMargin = utils.formatEther(minOpeningMargin)

      console.log("minOpeningMargin", PositionsState[key].minOpeningMargin)





    setPositionsState({ ...PositionsState, 
      PositionsState
    })

    console.log("asdasd", PositionsState)

  }