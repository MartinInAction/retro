// @flow
import React, {PureComponent} from 'react'
import {StyleSheet, View} from 'react-native'
import colors from '../consts/Colors'
type Props = {}
type State = {}
export default class EqualizerDot extends PureComponent<Props, State> {
    state = {}

    componentDidMount () {}

    render (): React$Node {
      return <View style={styles.container} />
    }
}

const styles = StyleSheet.create({
  container: {
    height: 5,
    width: 5,
    opacity: 0.5,
    margin: 1,
    backgroundColor: colors.black
  }
})
