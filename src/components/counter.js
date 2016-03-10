import React, { Text, PropTypes } from 'react-native';
import TimerMixin from 'react-timer-mixin';

const CountDown = React.createClass({
  propTypes: {
    endTime: PropTypes.number,
    textStyle: PropTypes.object,
    time: PropTypes.number,
  },
  mixins: [TimerMixin],
  getInitialState() {
    return {
      time: this.props.time ? this.props.time : 0,
    };
  },
  componentDidMount() {
    this._countdown();
  },

  _countdown() {
    const timer = function () {
      const time = this.state.time + 1;
      this.setState({ time });
      if (time >= 0 && time < this.props.endTime) {
        this.setTimeout(timer, 1);
      } else {
        this.setState({ disabled: false });
      }
    };
    this.setTimeout(timer, 1);
  },

  render() {
    return (
      <Text style={this.props.textStyle}>{this.state.time}</Text>
    );
  },
});

export default CountDown;
