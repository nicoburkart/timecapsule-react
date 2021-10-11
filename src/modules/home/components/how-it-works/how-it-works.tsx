import { Component } from 'react';
import './how-it-works.scss';

import Ill1 from 'assets/images/hiw-illustration-1.svg';
import Ill2 from 'assets/images/hiw-illustration-2.svg';
import Ill3 from 'assets/images/hiw-illustration-3.svg';

class HowItWorks extends Component {
  render() {
    return (
      <section className="how-it-works">
        <h2 className="section-header">How It Works</h2>

        <div className="container">
          <div className="step">
            <img src={Ill1} alt="guy with a wallet holding a coin" />
            <h3 className="sub-section-header">Connect Your Wallet</h3>
            <p>
              Send your coins through <br /> Metamask
            </p>
          </div>
          <div className="step">
            <img src={Ill2} alt="guy on a laptop typing" />
            <h3 className="sub-section-header">Enter Time And Amount</h3>
            <p>
              How long do you want the time <br /> capsule to be locked?
            </p>
          </div>
          <div className="step">
            <img src={Ill3} alt="guy next to a wallet holding a coin" />
            <h3 className="sub-section-header">Recipient Gets The Money</h3>
            <p>
              Someone is going to be very <br /> happy in a few months/years...
            </p>
          </div>
        </div>
      </section>
    );
  }
}

export default HowItWorks;
