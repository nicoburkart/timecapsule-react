pragma solidity ^0.5.0;

contract TimeCapsule {
  struct Capsule {
    address sender;
    address payable recipient;
    uint256 amount;
    uint256 openingDate;
  }

  mapping(address => Capsule) capsules;

  function createCapsule(address payable _recipient, uint256 _openingDate)
    public
    payable
  {
    require(
      msg.value > 0 && _openingDate > block.timestamp * 1000 - 30,
      'requirements are not met'
    );

    capsules[_recipient] = Capsule({
      sender: msg.sender,
      recipient: _recipient,
      amount: msg.value,
      openingDate: _openingDate
    });
  }

  function getCapsuleAt(address _recipientAddress)
    public
    view
    returns (
      address _sender,
      address payable _recipient,
      uint256 _amount,
      uint256 _openingDate
    )
  {
    address _sender = capsules[_recipientAddress].sender;
    address payable _recipient = capsules[_recipientAddress].recipient;
    uint256 _amount = capsules[_recipientAddress].amount;
    uint256 _openingDate = capsules[_recipientAddress].openingDate;
    return (_sender, _recipient, _amount, _openingDate);
  }

  function openCapsule() public {
    require(
      capsules[msg.sender].openingDate <= block.timestamp * 1000 + 15,
      "capsule can't be opened yet"
    );
    uint256 amount = capsules[msg.sender].amount;
    delete capsules[msg.sender];
    msg.sender.transfer(amount);
  }
}
