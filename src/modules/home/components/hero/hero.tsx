import { Component, createRef } from 'react';
import HeroBackgroundImage from 'assets/images/hero-background.svg';
import HeroLine from 'assets/images/hero-line.svg';
import { Link } from 'react-scroll';

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

            <Link
              to="time-capsule-section"
              spy={true}
              smooth={true}
              duration={500}
              offset={-50}
            >
              <button className="primary-btn">Create Capsule</button>
            </Link>
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
