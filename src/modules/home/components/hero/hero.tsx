import { Component } from 'react';
import HeroBackgroundImage from 'assets/images/hero-background.svg';
import HeroLine from 'assets/images/hero-line.svg';

import './hero.scss';

class Hero extends Component {
  render() {
    return (
      <div className="hero">
        <img
          className="hero-background-curve"
          src={HeroBackgroundImage}
          alt="background"
        />
        <img className="hero-background-line" src={HeroLine} alt="" />
        <div className="container">
          <div className="hero-text">
            <h1 className="header">
              Your Will
              <br />
              On A Secure
              <br />
              Blockchain
            </h1>
            <button className="primary-btn">Learn More</button>
          </div>

          <div className="hero-animation">
            <iframe
              title="hero-animation"
              src="https://embed.lottiefiles.com/animation/65396"
            ></iframe>
            <div className="hover-prevent"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Hero;
