import { utils } from 'ethers'

// account, contract_provider, contract_provider_withprice, snxcontract_provider, setPositionsState, collat.address)
export async function HandleLoadDashboardValues(account, contract_provider, contract_provider_withprice, snxcontract_provider, PositionsState, setPositionsState, key, value) {

  function convertBytes32 (_name) {
    if(!_name) return
    return utils.formatBytes32String(_name)
  }


  const bytes32code = convertBytes32(value.fullname);
  const sUSDCode = convertBytes32("sUSD");


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

    PositionsState[key].loandisplay = _loanval.mul(100000)
    PositionsState[key].collatposteddisplay = _collatval.mul(100000)
    PositionsState[key].collatvaluedisplay = _price.mul(100000)


    setPositionsState({ ...PositionsState, 
      PositionsState
    
    })

    console.log("asdasd", PositionsState)

  }