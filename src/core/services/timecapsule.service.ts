import { time } from 'console';
import Web3 from 'web3';

declare let require: any;
declare let window: any;

//Application Binary Interface (ABI)
const timeCapsuleArtifact = require('truffle/build/contracts/TimeCapsule.json');
var truffleContract = require('@truffle/contract');

export class TimeCapsuleService {
  private web3Provider: any;
  private web3: any;
  contract: any;

  async initWeb3(): Promise<boolean> {
    if (window.ethereum) {
      this.web3Provider = window.ethereum;
      try {
        //account access request
        await window.ethereum.enable();
      } catch (error) {
        console.error('User denied account access');
      }
    }

    //legacy dapp browsers
    else if (window.web3) {
      this.web3Provider = window.web3.currentProvider;
    } else {
      console.log('no web3 provider found');
      return Promise.resolve(false);
    }

    //ACHTUNG nur für development verwenden! Unsicher und ungeeignet für prod
    //Wenn kein injected web3 Objekt präsent ist, wird eins über den lokalen provider erstellt (Ganache)
    /* else {
      this.web3Provider = new Web3.providers.HttpProvider(
        'http://localhost:7545'
      );
    } */
    this.web3 = new Web3(this.web3Provider);
    this.initContract();
    return Promise.resolve(true);
  }

  getAccounts(): Promise<string> {
    return this.web3.eth.getAccounts();
  }

  initContract() {
    this.contract = truffleContract(timeCapsuleArtifact);
    this.contract.setProvider(this.web3Provider);
  }

  async getCapsuleAt(recipientAddress: string): Promise<any> {
    let timeCapsuleInstance = await this.contract.deployed();

    try {
      const capsule = await timeCapsuleInstance.getCapsuleAt(recipientAddress);
      let block = await this.web3.eth.getBlock('latest');
      console.log('timestamp: ', block.timestamp * 1000);
      console.log('opening date: ', BigInt(capsule[3]));
      console.log(
        'time left: ',
        BigInt(capsule[3]) - BigInt(block.timestamp * 1000)
      );

      return Promise.resolve(capsule);
    } catch (error) {
      console.info(error);
      return Promise.reject(error);
    }
  }

  async createCapsule(
    senderAddress: string,
    recipientAddress: string,
    amount: number,
    openingDate: number
  ): Promise<boolean> {
    try {
      let timeCapsuleInstance = await this.contract.deployed();
      await timeCapsuleInstance.createCapsule(recipientAddress, openingDate, {
        from: senderAddress,
        value: this.web3.utils.toWei(amount.toString(), 'ether'),
      });
      return Promise.resolve(true);
    } catch (error) {
      console.error(error);
      return Promise.resolve(false);
    }
  }

  async openCapsule(recipientAddress: string): Promise<boolean> {
    try {
      let timeCapsuleInstance = await this.contract.deployed();
      await timeCapsuleInstance.openCapsule({ from: recipientAddress });
      return Promise.resolve(true);
    } catch (error) {
      console.log(error);
      return Promise.resolve(false);
    }
  }
}
