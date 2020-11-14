// @flow
import React, {PureComponent} from 'react'
import {View, StyleSheet} from 'react-native'
import EqualizerRow from './EqualizerRow'
import colors from '../consts/Colors'
type Props = {
    isActive: boolean
}
type State = {}

const NUMBERS_OF_BARS = 32
export default class Equalizer extends PureComponent<Props, State> {
    state = {}

    componentDidMount () {

    }

    render (): React$Node {
      let {isActive} = this.props
      return <View style={styles.container}>
        {Array(NUMBERS_OF_BARS).fill(0).map((item, index) => <EqualizerRow isActive={isActive} index={index} key={index} />)}
      </View>
    }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: colors.green
  }
})
