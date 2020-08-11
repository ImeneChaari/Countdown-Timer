import React, { Component } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Clock.css";

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      count: 0,
      paused: false,
      resumed: false,
      started: false,
    };
  }

  displayTime = (numberSeconds) => {
    let hours = Math.floor(numberSeconds / 3600);
    let minutes = Math.floor((numberSeconds - hours * 3600) / 60);
    let seconds = numberSeconds - hours * 3600 - minutes * 60;
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return [hours, minutes, seconds];
  };

  pauseTimer = () => {
    if (this.state.started === true) {
      this.setState({ paused: true });
      console.log(this.state);
      clearInterval(this.timerID);
    }
  };

  resumeTimer = () => {
    console.log(this.state);

    if (this.state.paused === true) {
      this.timerID = setInterval(() => {
        this.setState({
          count: this.state.count - 1,
        });
      }, 1000);
      this.setState({ paused: false });
    }
  };

  clearTimer = () => {
    clearInterval(this.timerID);
    this.setState({
      paused: false,
      count: 0,
      strated: false,
      resumed: false,
      input: "",
    });
    console.log(this.state);
  };

  componentDidUpdate() {
    if (this.state.count === 0) {
      clearInterval(this.timerID);
      if (this.state.started === true) this.setState({ started: false });
      if (this.state.resumed === true) this.setState({ resumed: false });
      if (this.state.input) this.setState({ input: "" });
    }
  }

  handleInputChange = (event) => {
    let regInput = /^\d*$/;
    if (!regInput.test(event.target.value))
      alert("The input value must be a positive number!");
    else if (event.target.value > 86400)
      alert("The number of seconds must be less than 86400 (24hours)!");
    else if (!this.state.started)
      this.setState({ count: event.target.value, input: event.target.value });
  };

  startTimer = () => {
    if (this.state.count > 0 && !this.state.started) {
      this.setState({
        started: true,
      });
      this.timerID = setInterval(() => {
        this.setState({
          count: this.state.count - 1,
        });
      }, 1000);
    }
  };

  render() {
    return (
      <div className="externalDiv">
        <div className="mainContainer">
          <h3 className="title">Countdown Timer</h3>
          <div className="inputAndStartBar">
            <input
              type="number"
              onChange={this.handleInputChange}
              value={this.state.input}
              min="0"
              max="86400"
              placeholder="Insert number of seconds"
            ></input>

            <button
              onClick={() => {
                this.startTimer();
              }}
            >
              Start
            </button>
          </div>
          <div className="completeClock">
            {this.displayTime(this.state.count).map((item, i) => (
              <div className="clockBlock" key={i}>
                <div className="progBar">
                  <CircularProgressbar
                    value={(item / `${i === 0 ? 24 : 60}`) * 100}
                    text={`${item}`}
                    counterClockwise={true}
                    strokeWidth={3}
                    styles={{
                      path: {
                        stroke: "#3ce7fa",
                      },

                      trail: {
                        stroke: "white",
                        opacity: "0.3",
                      },

                      text: {
                        fill: "#3ce7fa",
                        fontSize: "16px",
                      },
                    }}
                  />
                </div>
                <span className="fieldName">
                  {i === 0 ? "hours" : i === 1 ? "minutes" : "seconds"}
                </span>
              </div>
            ))}
          </div>

          <div className="buttonsBar">
            <button
              onClick={() => {
                this.pauseTimer();
              }}
            >
              Pause
            </button>
            <button
              onClick={() => {
                this.resumeTimer();
              }}
            >
              Resume
            </button>
            <button
              onClick={() => {
                this.clearTimer();
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Clock;
