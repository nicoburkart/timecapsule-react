import { Component } from 'react';
import './time-capsule.scss';

class TimeCapsule extends Component {
  render() {
    return (
      <section className="time-capsule-section">
        <div className="container">
          <div className="time-capsule">
            <h2 className="section-header">Create A Time Capsule</h2>
          </div>
        </div>
      </section>
    );
  }
}

export default TimeCapsule;
