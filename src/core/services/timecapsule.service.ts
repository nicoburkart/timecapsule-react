//import Web3 from 'web3';

declare let require: any;
declare let window: any;

//Application Binary Interface (ABI)
const timeCapsuleArtifact = require('../../../../build/contracts/TimeCapsule.json');
var contract = require('@truffle/contract')

export class TimeCapsuleService {

  private account: any = null;
  private web3Provider: any;
  private enable: any;

  constructor() {
    this.initWeb3()
  }

  async initWeb3() {

    if(window.ethereum) {
      this.web3Provider = window.ethereum;
      try {
        //account access request
        await window.ethereum.enable();
      } catch(error) {
        console.error("User denied account access")
      }
    }

    //legacy dapp browsers
    else if (window.web3) {
      this.web3Provider = window.web3.currentProvider;
    }

    //ACHTUNG nur für development verwenden! Unsicher und ungeeignet für prod
    //Wenn kein injected web3 object präsent ist, wird eins über den lokalen provider erstellt (Ganache)
    else {
      //this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }

    //const web3 = new Web3(this.web3Provider)‚

    //this.initContract(web3)
  }

  
  /* private initContract(web3: Web3) {
    var myContract = contract(timeCapsuleArtifact) */
    //const transferContract = contract(timeCapsuleArtifact);
    //transferContract.setProvider(this.web3Provider);
  
    
}
