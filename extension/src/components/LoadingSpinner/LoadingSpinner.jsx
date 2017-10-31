import React from "react";

const buildLabel = (label, ticks) => label + Array(ticks + 1).join(".");

class LoadingSpinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tick: 0,
      timer: null
    };
  }

  componentDidMount() {
    const timer = setInterval(() => {
      this.setState({ tick: (this.state.tick + 1) % 4 })
    }, 500);
    this.setState({ timer });
  }

  componentWillUnmount() {
    if (this.state.timer) {
      clearInterval(this.state.timer);
    }
  }

  render() {
    return (
      <div className="loading-spinner">
        <div className="spinner-container">
          <div className="spinner" />
        </div>
        <p>{buildLabel(this.props.label, this.state.tick)}</p>
      </div> 
    );
  }
}

export default LoadingSpinner;