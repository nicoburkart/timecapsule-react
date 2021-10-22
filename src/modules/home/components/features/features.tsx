import { Component } from 'react';
import './features.scss';

import ContractIcon from 'assets/icons/contract.svg';
import ShieldIcon from 'assets/icons/shield.svg';
import NetworkIcon from 'assets/icons/network.svg';
import WaveBackground from 'assets/images/wave-section-background.svg';
import WaveSectionLine from 'assets/images/wave-section-line.svg';

class Features extends Component {
  render() {
    return (
      <section className="features">
        <h2 className="section-header">What We Offer</h2>
        <div className="container">
          <div className="feature">
            <img src={ContractIcon} alt="contract icon" className="icon" />
            <h3 className="sub-section-header">Time Capsule Contract</h3>
            <p>
              With the time capsule contract you will be able to decide when
              money should be trasmitted to a selected recipient. For example 1
              month or even 50 years.
            </p>
          </div>
          <div className="feature">
            <img src={ShieldIcon} alt="shield icon" className="icon" />
            <h3 className="sub-section-header">High Security</h3>
            <p>
              The time capsule will be saved on a smart contract on the Ethereum
              blockchain. Thus the security is provided by the Ethereum network.
            </p>
          </div>
          <div className="feature">
            <img src={NetworkIcon} alt="network icon" className="icon" />
            <h3 className="sub-section-header">Independency</h3>
            <p>
              No third party will be intervene with your contract. Everything
              will be handled independently on the Ethereum blockchain.
            </p>
          </div>
        </div>
        <img className="wave-background-img" src={WaveBackground} alt="" />
        <img src={WaveSectionLine} alt="" className="line-img" />
      </section>
    );
  }
}

export default Features;
