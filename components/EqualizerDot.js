// @flow
import React, {PureComponent} from 'react'
import {StyleSheet, View} from 'react-native'
import colors from '../consts/Colors'
type Props = {}
type State = {
  opacity: number
}
export default class EqualizerDot extends PureComponent<Props, State> {
  state = {
    opacity: 0
  }

  interval = undefined

  componentDidMount () {
    this.start()
  }

  render (): React$Node {
    return <View style={[styles.container, {opacity: this.getBackgroundColor()}]} />
  }

  getBackgroundColor = (): number => {
    return this.state.opacity || 0.4
  }

  stop = () => {
    clearInterval(this.interval)
    this.interval = undefined
  }

  start = () => {
    /* this.interval = setInterval(() => {
      this.setState({opacity: Math.floor(Math.random() * Math.floor(0) + 1)})
    }, Math.floor(Math.random() * Math.floor(1000) + 1)) */
  }
}

const styles = StyleSheet.create({
  container: {
    height: 5,
    width: 5,
    opacity: 0.3,
    margin: 1,
    backgroundColor: colors.black
  }
})
