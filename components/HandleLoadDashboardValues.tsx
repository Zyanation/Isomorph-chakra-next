import { utils } from 'ethers'


export async function HandleLoadDashboardValues(account, contract_provider, contract_provider_withprice, _setLoanDisplay, _setPostedDisplay, _setCollatPriceDisplay, _ADDR) {


  const sUSDCode = utils.formatBytes32String("sUSD");
  const sETHCode = utils.formatBytes32String("sETH");
  const sBTCCode = utils.formatBytes32String("sBTC");

    //these return promises!
  
    const _loanval = await contract_provider.moUSDLoaned(_ADDR, account)
    const _collatval = await contract_provider.collateralPosted(_ADDR, account)

    const SYNTH = 0;
    const LYRA = 1;

    let bytes32;
    // if(_ADDR == "0xaA5068dC2B3AADE533d3e52C6eeaadC6a8154c57") {
    //   bytes32 = sUSDCode;
    // }

    console.log("what about here", sUSDCode, _collatval)
    const _price = await contract_provider_withprice.priceCollateralToUSD(sETHCode, utils.parseEther('1'), SYNTH)

    console.log(contract_provider, _ADDR, account)

    console.log("I hope this works _price", _price)

    _setLoanDisplay(_loanval)
    _setPostedDisplay(_collatval)
    _setCollatPriceDisplay(_price)
  }