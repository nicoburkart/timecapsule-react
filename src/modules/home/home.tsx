import React, { Component } from 'react';
import Features from './components/features/features';
import Hero from './components/hero/hero';
import HowItWorks from './components/how-it-works/how-it-works';
import TimeCapsule from './components/time-capsule/time-capsule';

import './home.scss';

class Home extends Component {
  render() {
    return (
      <div id="home">
        <Hero></Hero>
        <HowItWorks></HowItWorks>
        <Features></Features>
        <TimeCapsule></TimeCapsule>
      </div>
    );
  }
}

export default Home;
