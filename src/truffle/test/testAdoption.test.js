/* eslint-disable jest/valid-describe */
/* eslint-disable no-undef */

//importiert den contract
const TimeCapsule = artifacts.require('TimeCapsule');

//accounts sind die verfügbaren accounts bei ganache
contract('TimeCapsule', (accounts) => {
  //initiales setup des contracts
  before(async () => {
    timeCapsule = await TimeCapsule.deployed();
    console.log('contract deployed');
  });

  describe('create a capsule and retrieve account addresses', async () => {
    sender = accounts[2];
    recipient = accounts[4];
    amount = web3.utils.toWei('10', 'ether');
    openingTime = Math.floor(new Date().valueOf() / 1000);

    //writing on the blockchain
    before('create a capsule with account', async () => {
      balanceBefore = await web3.eth.getBalance(sender);
      receipt = await timeCapsule.createCapsule(recipient, openingTime, {
        from: sender,
        value: amount,
      });
    });

    it('can deposit money', async () => {
      balanceAfter = await web3.eth.getBalance(sender);
      tx = await web3.eth.getTransaction(receipt.tx);
      usedGas = receipt.receipt.gasUsed;
      gasPrice = tx.gasPrice;
      gasCost = +gasPrice * +usedGas;
      assert.equal(
        +balanceBefore,
        +balanceAfter + +amount + +gasCost,
        'should be same amount'
      );
    });

    //ein test
    it('can fetch a created capsule', async () => {
      const capsule = await timeCapsule.getCapsuleAt(recipient);
      assert.equal(capsule[0], sender, 'Should be sender');
      assert.equal(capsule[1], recipient, 'Should be recipient');
      assert.equal(BigInt(capsule[2]), amount, 'Should be amount');
      assert.equal(capsule[3].toNumber(), openingTime, 'Should be openingTime');
    });

    it('can withdraw the money from a capsule', async () => {
      recipientBalanceBefore = await web3.eth.getBalance(recipient);
      withdrawReceipt = await timeCapsule.openCapsule({
        from: recipient,
      });

      tx = await web3.eth.getTransaction(withdrawReceipt.tx);
      usedGas = withdrawReceipt.receipt.gasUsed;
      gasPrice = tx.gasPrice;
      gasCost = +gasPrice * +usedGas;

      recipientBalanceAfter = await web3.eth.getBalance(recipient);

      assert.equal(
        +recipientBalanceBefore + +amount,
        +recipientBalanceAfter + +gasCost
      );
    });

    it('deletes the capsule after opening it', async () => {
      const capsule = await timeCapsule.getCapsuleAt(recipient);
      assert.equal(
        capsule[0],
        '0x0000000000000000000000000000000000000000',
        'Sender should be empty'
      );
      assert.equal(
        capsule[1],
        '0x0000000000000000000000000000000000000000',
        'Recipient should be empty'
      );
      assert.equal(BigInt(capsule[2]), 0, 'Amount should be empty');
      assert.equal(capsule[3].toNumber(), 0, 'OpeningTime should be empty');
    });
  });
});
