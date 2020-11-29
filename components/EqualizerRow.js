// @flow
import React, {PureComponent} from 'react'
import {StyleSheet, View} from 'react-native'
import EqualizerDot from './EqualizerDot'

const MAX_DOTS = 32
type Props = {
  isActive: boolean,
  index: number
}
type State = {
  numberOfDots: number
}

export default class EqualizerRow extends PureComponent<Props, State> {
    state = {
      numberOfDots: MAX_DOTS
    }

    interval: ?Object
    componentWillReceiveProps (nextProps: Props, nextState: State) {
      // if (!nextProps.isActive) this.stop()
      // if (nextProps.isActive) this.start()
    }

    render (): React$Node {
      let {isActive} = this.props
      let {numberOfDots} = this.state
      return <View style={styles.container}>
        {Array(numberOfDots).fill(0).map((item, index) => <EqualizerDot index={index} isActive={isActive} key={index} />)}
      </View>
    }

    stop = () => {
      clearInterval(this.interval)
      this.interval = undefined
      this.setState({numberOfDots: 1})
    }

    start = () => {
      this.interval = setInterval(() => {
        this.setState({numberOfDots: Math.round(Math.random() * Math.floor(30)) + 1})
      }, Math.floor(Math.random() * Math.floor(1000) + 50))
    }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column-reverse',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  }
})
