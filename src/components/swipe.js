import React, { Animated, Component, Dimensions, PanResponder, PropTypes, View } from 'react-native';

const ScreenWidth = Dimensions.get('window').width;

export default class Swipe extends Component {
  constructor(props) {
    super(props);
    this.position = new Animated.Value(0);
  }

  componentWillMount() {
    this.panresponders = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if (!this.props.disabled && gestureState.dx > 0) {
          return true;
        }
        return false;
      },
      onMoveShouldSetResponderCapture: () => true,
      onPanResponderMove: Animated.event([
        null, { dx: this.position },
      ]),
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > this.props.gestureStartPosition) {
          Animated.timing(this.position, {
            toValue: ScreenWidth,
            duration: 150,
          }).start();
          this.props.onSwipe();
          setTimeout(() => {
            Animated.timing(this.position, {
              toValue: 0,
              duration: 150,
            }).start();
          }, 700);
        } else {
          Animated.timing(this.position, {
            toValue: 0,
            duration: 150,
          }).start();
        }
      },
    });
  }

  render() {
    return(
      <View>
        {this.props.renderUnderlay()}
        <Animated.View style={[this.props.overlayStyle, { transform: [{ translateX: this.position }] }]}
          {...this.panresponders.panHandlers}
        >
          {this.props.children}
        </Animated.View>
      </View>
    );
  }
}

Swipe.propTypes = {
  children: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
  gestureStartPosition: PropTypes.number,
  onSwipe: PropTypes.func.isRequired,
  overlayStyle: PropTypes.array,
  renderUnderlay: PropTypes.func.isRequired,
};

Swipe.defaultProps = {
  gestureStartPosition: ScreenWidth/3,
  disabled: false,
};
