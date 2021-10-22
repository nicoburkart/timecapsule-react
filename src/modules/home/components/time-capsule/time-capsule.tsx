import { TimeCapsuleService } from 'core/services/timecapsule.service';
import { Component, FormEvent } from 'react';
import Web3 from 'web3';
import './time-capsule.scss';

import PaperPlane from 'assets/icons/paper-plane.svg';

class TimeCapsule extends Component {
  state = {
    creationCapsule: {
      senderAddress: '',
      recipientAddress: '',
      amount: 0,
      year: 2021,
      month: 10,
      day: 20,
      hour: 0,
      minute: 0,
    },
    openingCapsule: {
      senderAddress: '',
      recipientAddress: '',
      amount: 0,
      openingDate: 0,
    },

    balance: 0,
    registerToggle: true,
  };

  service = new TimeCapsuleService();

  constructor(props: any) {
    super(props);

    this.getCapsule = this.getCapsule.bind(this);
    this.createCapsule = this.createCapsule.bind(this);
    this.openCapsule = this.openCapsule.bind(this);
    this.toggleRegisterCard = this.toggleRegisterCard.bind(this);
    this.handleChangeOnCreateTimeCapsule =
      this.handleChangeOnCreateTimeCapsule.bind(this);
    this.handleChangeOnOpenTimeCapsule =
      this.handleChangeOnOpenTimeCapsule.bind(this);
    this.TimeCapsuleBody = this.TimeCapsuleBody.bind(this);
    this.CreateTimeCapsule = this.CreateTimeCapsule.bind(this);
    this.OpenTimeCapsule = this.OpenTimeCapsule.bind(this);
  }

  componentDidMount = async () => {
    this.service = new TimeCapsuleService();
    await this.service.initWeb3();
    const accounts = await this.service.getAccounts();
    this.setState({
      creationCapsule: {
        senderAddress: accounts[0],
        recipientAddress: '',
        amount: 0,
        year: this.state.creationCapsule.year,
        month: this.state.creationCapsule.month,
        day: this.state.creationCapsule.day,
        hour: 0,
        minute: 0,
      },
    });
  };

  toggleRegisterCard(id: number) {
    this.setState({
      openingCapsule: {
        senderAddress: '',
        recipientAddress: '',
        amount: 0,
        openingDate: 0,
      },

      balance: 0,
      registerToggle: id === 0,
    });
  }

  async createCapsule(event: FormEvent) {
    event.preventDefault();

    const openingTime = new Date(
      this.state.creationCapsule.year +
        '-' +
        this.state.creationCapsule.month +
        '-' +
        this.state.creationCapsule.day +
        ' ' +
        this.state.creationCapsule.hour +
        ':' +
        this.state.creationCapsule.minute
    ).valueOf();

    console.log(
      'trying to create a capsule with values: ',

      this.state.creationCapsule.recipientAddress
    );

    try {
      const success = await this.service.createCapsule(
        this.state.creationCapsule.senderAddress,
        this.state.creationCapsule.recipientAddress,
        this.state.creationCapsule.amount,
        openingTime
      );
      console.log(success);
    } catch (error) {
      console.log(error);
    }
  }

  async getCapsule(event: FormEvent) {
    event.preventDefault();
    try {
      const capsule = await this.service.getCapsuleAt(
        this.state.openingCapsule.recipientAddress
      );

      this.setState({
        openingCapsule: {
          senderAddress: capsule[0],
          recipientAddress: capsule[1],
          amount: Web3.utils.fromWei(String(BigInt(capsule[2])), 'ether'),
          openingDate: capsule[3].toNumber(),
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  async openCapsule(event: FormEvent) {
    event.preventDefault();
    try {
      console.log(this.state.openingCapsule.recipientAddress);
      const success = await this.service.openCapsule(
        this.state.openingCapsule.recipientAddress
      );
      console.log(success);
    } catch (error) {
      console.log(error);
    }
  }

  handleChangeOnCreateTimeCapsule(event: FormEvent) {
    const target = event.target as HTMLInputElement;

    switch (target.id) {
      case 'to': {
        this.setState({
          creationCapsule: {
            senderAddress: this.state.creationCapsule.senderAddress,
            recipientAddress: target.value,
            amount: this.state.creationCapsule.amount,
            year: this.state.creationCapsule.year,
            month: this.state.creationCapsule.month,
            day: this.state.creationCapsule.day,
            hour: this.state.creationCapsule.hour,
            minute: this.state.creationCapsule.minute,
          },
        });
        break;
      }
      case 'amount': {
        this.setState({
          creationCapsule: {
            senderAddress: this.state.creationCapsule.senderAddress,
            recipientAddress: this.state.creationCapsule.recipientAddress,
            amount: target.value,
            year: this.state.creationCapsule.year,
            month: this.state.creationCapsule.month,
            day: this.state.creationCapsule.day,
            hour: this.state.creationCapsule.hour,
            minute: this.state.creationCapsule.minute,
          },
        });
        break;
      }
      case 'year': {
        this.setState({
          creationCapsule: {
            senderAddress: this.state.creationCapsule.senderAddress,
            recipientAddress: this.state.creationCapsule.recipientAddress,
            amount: this.state.creationCapsule.amount,
            year: target.value,
            month: this.state.creationCapsule.month,
            day: this.state.creationCapsule.day,
            hour: this.state.creationCapsule.hour,
            minute: this.state.creationCapsule.minute,
          },
        });
        break;
      }
      case 'month': {
        this.setState({
          creationCapsule: {
            senderAddress: this.state.creationCapsule.senderAddress,
            recipientAddress: this.state.creationCapsule.recipientAddress,
            amount: this.state.creationCapsule.amount,
            year: this.state.creationCapsule.year,
            month: target.value,
            day: this.state.creationCapsule.day,
            hour: this.state.creationCapsule.hour,
            minute: this.state.creationCapsule.minute,
          },
        });
        break;
      }
      case 'day': {
        this.setState({
          creationCapsule: {
            senderAddress: this.state.creationCapsule.senderAddress,
            recipientAddress: this.state.creationCapsule.recipientAddress,
            amount: this.state.creationCapsule.amount,
            year: this.state.creationCapsule.year,
            month: this.state.creationCapsule.month,
            day: target.value,
            hour: this.state.creationCapsule.hour,
            minute: this.state.creationCapsule.minute,
          },
        });
        break;
      }
      case 'hour': {
        this.setState({
          creationCapsule: {
            senderAddress: this.state.creationCapsule.senderAddress,
            recipientAddress: this.state.creationCapsule.recipientAddress,
            amount: this.state.creationCapsule.amount,
            year: this.state.creationCapsule.year,
            month: this.state.creationCapsule.month,
            day: this.state.creationCapsule.day,
            hour: target.value,
            minute: this.state.creationCapsule.minute,
          },
        });
        break;
      }
      case 'minute': {
        this.setState({
          creationCapsule: {
            senderAddress: this.state.creationCapsule.senderAddress,
            recipientAddress: this.state.creationCapsule.recipientAddress,
            amount: this.state.creationCapsule.amount,
            year: this.state.creationCapsule.year,
            month: this.state.creationCapsule.month,
            day: this.state.creationCapsule.day,
            hour: this.state.creationCapsule.hour,
            minute: target.value,
          },
        });
        break;
      }
    }
  }

  handleChangeOnOpenTimeCapsule(event: FormEvent) {
    const target = event.target as HTMLInputElement;

    switch (target.id) {
      case 'from': {
        this.setState({
          openingCapsule: {
            senderAddress: this.state.openingCapsule.senderAddress,
            recipientAddress: target.value,
            amount: this.state.openingCapsule.amount,
            openingDate: this.state.openingCapsule.openingDate,
          },
        });
        break;
      }
    }
  }

  render() {
    return (
      <section className="time-capsule-section">
        <div className="container">
          <div className="time-capsule">
            <div className="time-capsule-header">
              <div
                className={`register-card ${
                  this.state.registerToggle ? 'active' : ''
                }`}
                onClick={() => this.toggleRegisterCard(0)}
              >
                <h2 className="sub-section-header">Create Time Capsule</h2>
              </div>

              <div
                className={`register-card ${
                  this.state.registerToggle ? '' : 'active'
                }`}
                onClick={() => this.toggleRegisterCard(1)}
              >
                <h2 className="sub-section-header">Open Time Capsule</h2>
              </div>
            </div>
            <div className="time-capsule-body">
              <this.TimeCapsuleBody />
            </div>
          </div>
        </div>
      </section>
    );
  }

  TimeCapsuleBody() {
    return this.state.registerToggle ? (
      <this.CreateTimeCapsule />
    ) : (
      <this.OpenTimeCapsule />
    );
  }

  CreateTimeCapsule() {
    return (
      <form className="form create-time-capsule" onSubmit={this.createCapsule}>
        <div className="form-group sender-information">
          <div className="input-group ">
            <label className="input-label" htmlFor="from">
              From:
            </label>
            <input
              className="form-control"
              value={this.state.creationCapsule.senderAddress}
              name="from"
              id="from"
              type="text"
              readOnly
              required
              onChange={this.handleChangeOnCreateTimeCapsule}
            />
          </div>

          <img className="paper-plane" src={PaperPlane} alt="send icon" />

          <div className="input-group ">
            <label className="input-label" htmlFor="to">
              To:
            </label>
            <input
              className="form-control"
              name="to"
              id="to"
              type="text"
              required
              onChange={this.handleChangeOnCreateTimeCapsule}
            />
          </div>
        </div>
        <div className="input-group colorful">
          <label className="input-label" htmlFor="amount">
            Amount:
          </label>
          <input
            className="form-control"
            name="amount"
            id="amount"
            type="number"
            required
            placeholder="0 ETH"
            onChange={this.handleChangeOnCreateTimeCapsule}
          />
        </div>
        <div className="form-group date">
          <div className="input-group ">
            <label className="input-label" htmlFor="year">
              Opening-Year:
            </label>
            <input
              className="form-control"
              name="year"
              id="year"
              type="number"
              required
              onChange={this.handleChangeOnCreateTimeCapsule}
              defaultValue={this.state.creationCapsule.year}
            />
          </div>

          <div className="input-group ">
            <label className="input-label" htmlFor="month">
              Opening-Month:
            </label>
            <input
              className="form-control"
              name="month"
              id="month"
              type="number"
              required
              onChange={this.handleChangeOnCreateTimeCapsule}
              defaultValue={this.state.creationCapsule.month}
            />
          </div>

          <div className="input-group ">
            <label className="input-label" htmlFor="day">
              Opening-Day:
            </label>
            <input
              className="form-control"
              name="day"
              id="day"
              type="number"
              required
              onChange={this.handleChangeOnCreateTimeCapsule}
              defaultValue={this.state.creationCapsule.day}
            />
          </div>

          <div className="input-group ">
            <label className="input-label" htmlFor="hour">
              Opening-Hour:
            </label>
            <input
              className="form-control"
              name="hour"
              id="hour"
              type="number"
              required
              onChange={this.handleChangeOnCreateTimeCapsule}
              defaultValue={this.state.creationCapsule.hour}
            />
          </div>

          <div className="input-group ">
            <label className="input-label" htmlFor="minute">
              Opening-Minute:
            </label>
            <input
              className="form-control"
              name="minute"
              id="minute"
              type="number"
              required
              onChange={this.handleChangeOnCreateTimeCapsule}
              defaultValue={this.state.creationCapsule.minute}
            />
          </div>
        </div>
        <button className="primary-btn" type="submit">
          Create
        </button>
      </form>
    );
  }

  OpenTimeCapsule() {
    return (
      <form className="form open-time-capsule" onSubmit={this.openCapsule}>
        <div className="form-group">
          <div className="input-group">
            <label className="input-label" htmlFor="from">
              Recipient Address:
            </label>

            <input
              className="form-control"
              name="from"
              id="from"
              type="text"
              onChange={this.handleChangeOnOpenTimeCapsule}
              required
            />
            <button className="input-btn" onClick={this.getCapsule}>
              Find Capsule
            </button>
          </div>
        </div>

        <div
          className={
            this.state.openingCapsule.openingDate === 0
              ? 'input-group colorful disabled'
              : 'input-group colorful'
          }
        >
          <label className="input-label" htmlFor="amount">
            Capsuled Money:
          </label>
          <input
            className="form-control"
            name="amount"
            id="amount"
            type="text"
            placeholder="0 ETH"
            value={this.state.openingCapsule.amount + ' ETH'}
            readOnly
          />
        </div>
        <div
          className={
            this.state.openingCapsule.openingDate === 0
              ? 'form-group date disabled'
              : 'form-group date'
          }
        >
          <div className="form-group date">
            <div className="input-group ">
              <label className="input-label" htmlFor="year">
                Opening-Year:
              </label>
              <input
                className="form-control"
                name="from"
                id="year"
                type="year"
                value={
                  this.state.openingCapsule.openingDate !== 0
                    ? new Date(
                        this.state.openingCapsule.openingDate
                      ).getFullYear()
                    : 0
                }
                readOnly
              />
            </div>

            <div className="input-group ">
              <label className="input-label" htmlFor="month">
                Opening-Month:
              </label>
              <input
                className="form-control"
                name="month"
                id="month"
                type="text"
                value={
                  this.state.openingCapsule.openingDate !== 0
                    ? new Date(
                        this.state.openingCapsule.openingDate
                      ).getMonth() + 1
                    : 0
                }
                readOnly
              />
            </div>

            <div className="input-group ">
              <label className="input-label" htmlFor="day">
                Opening-Day:
              </label>
              <input
                className="form-control"
                name="day"
                id="day"
                value={
                  this.state.openingCapsule.openingDate !== 0
                    ? new Date(this.state.openingCapsule.openingDate).getDate()
                    : 0
                }
                type="text"
                readOnly
              />
            </div>

            <div className="input-group ">
              <label className="input-label" htmlFor="hour">
                Opening-Hour:
              </label>
              <input
                className="form-control"
                name="hour"
                id="hour"
                type="text"
                value={
                  this.state.openingCapsule.openingDate !== 0
                    ? new Date(this.state.openingCapsule.openingDate).getHours()
                    : 0
                }
                readOnly
              />
            </div>

            <div className="input-group ">
              <label className="input-label" htmlFor="minute">
                Opening-Minute:
              </label>
              <input
                className="form-control"
                name="minute"
                id="minute"
                type="text"
                value={
                  this.state.openingCapsule.openingDate !== 0
                    ? new Date(
                        this.state.openingCapsule.openingDate
                      ).getMinutes()
                    : 0
                }
                readOnly
              />
            </div>
          </div>
        </div>
        <button
          className={
            this.state.openingCapsule.openingDate - new Date().valueOf() > 0 ||
            this.state.openingCapsule.openingDate === 0
              ? 'primary-btn disabled'
              : 'primary-btn'
          }
          type="submit"
          /* disabled={/*  this.state.openingCapsule.openingDate <= new Date().valueOf() ||
            this.state.openingCapsule.openingDate === 0 */
        >
          Open
        </button>
      </form>
    );
  }

  PopUpUserFeedback(success: boolean, error?: Error) {}
}

export default TimeCapsule;
