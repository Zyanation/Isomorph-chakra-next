
export async function HandleLoadDashboardValues(account, contract_provider, _setLoanDisplay, _setPostedDisplay, _ADDR) {

    //these return promises!
    const _loanval = await contract_provider.moUSDLoaned(_ADDR, account)
    const _collatval = await contract_provider.collateralPosted(_ADDR, account)

    console.log(contract_provider, _ADDR, account)

    console.log("is this the promise?", _loanval, _collatval)

    _setLoanDisplay(_loanval)
    _setPostedDisplay(_collatval)
  }