import React, {
    Text,
} from 'react-native';
var TimerMixin = require('react-timer-mixin');

var CountDown = React.createClass({
  mixins: [TimerMixin],
  getInitialState: function () {
    return {
      time: this.props.time ? this.props.time : 0,
    };
  },
  componentDidMount(){
    this._countdown();
  },
  render(){
    return (
      <Text style={this.props.textStyle}>{this.props.text}{this.state.time}</Text>
    );
  },

  _countdown(){
    var timer = function () {
      var time = this.state.time + 1;
      this.setState({time: time});
      if (time >= 0 && time < this.props.endTime) {
        this.setTimeout(timer, 1);
      } else {
        this.setState({disabled: false});
      }
    };
    this.setTimeout(timer, 1);
  }
});

module.exports = CountDown;
