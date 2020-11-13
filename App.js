// Flow
import React, {PureComponent } from 'react'
import { Image, AppRegistry, TouchableOpacity, SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Pressable, Dimensions} from 'react-native'
import Video from 'react-native-video'
import {getTrack, getTrackUrl} from './libs/SoundCloudHelper'
import SoundCloudWaveform from 'react-native-soundcloud-waveform'

type Props = {}
type State = {
  isPlaying: boolean,
  track: {
    stream_url: string,
    artwork_url: string,
    wavewaveform_url: string
  },
  percentPlayable: number,
  percentPlayed: number,
  audiDuration: number
}
// https://api.soundcloud.com/tracks/462716859?client_id=95f22ed54a5c297b1c41f72d713623ef
const TEST_TRACK = '462716859'
export class App extends PureComponent<Props, State> {
  state = {
    isPlaying: false,
    track: undefined,
    percentPlayable: 1,
    percentPlayed: 0
  }

  audioRef: ?Object

  componentDidMount () {
    getTrack(TEST_TRACK)
      .then((track) => this.setState({track}))

  }
  render () {
    let {isPlaying} = this.state
    let {track} = this.state
    return <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.wrapper}>
            {this.renderSoundAndWave()}
          <View style={styles.controlsWrapper}>
            <TouchableOpacity activeOpacity={0.8} style={styles.button}><Text>PREV</Text></TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => this.setState({ isPlaying: !isPlaying })}><Text>{isPlaying ? 'PAUSE' : 'PLAY'}</Text></TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.button}><Text>NEXT</Text></TouchableOpacity>
          </View>
        </View>
        </SafeAreaView>
    </View>
  }

  renderSoundAndWave=  () =>{
    let { track, isPlaying, percentPlayable, percentPlayed} = this.state
    if (!track) return <View />
    console.log(getTrackUrl('462716859'))
    return <View style={styles.soundContainer}>
      <Image source={{uri: track.artwork_url}} key={0} style={styles.artwork} />
      <View key={1} style={styles.waveContainer}>
        <SoundCloudWaveform
          waveformUrl={track.waveform_url}
          percentPlayed={percentPlayed}
          setTime={this.setTime}
          height={40}
          /* 
          activeInverse='black'
          activePlayable='red'
          activePlayableInverse='red'
          inactive='red'
          inactiveInverse='red'*/
        />
      </View>
      <Video 
        source={{ uri: track.stream_url}}
        ref={this.setAudioRef}
        volume={8}
        muted={false}
        onLoad={this.onAudioLoad}
        paused={!isPlaying}
        playInBackground={true}
        playWhenInactive={true}
        onProgress={this.onPlayProgress}
        onEnd={this.onPlayEnd}
        repeat={false}
      />
    </View>
     }

  setTime = (percentage: number) => {
    let {audiDuration} = this.state
    percentage = (percentage / 100) * 0.88
    console.warn(percentage)
    /* let newTime = (audiDuration * percentage) * 0.45
    this.audioRef.seek(newTime)
    this.setState({percentPlayed: (percentage * 0.88)})
    */
  }

  onAudioLoad = (audioProps: Object) => {
    console.warn('loaded media')
    this.setState({audiDuration: audioProps.duration})
  }

  onPlayProgress = (timerObject: Object) => {
    let {currentTime, playableDuration}  = timerObject
    let percentPlayed = currentTime / playableDuration
    this.setState({percentPlayed: percentPlayed,})
  }

  setAudioRef = (ref: Object) => this.audioRef = ref

  onPlayEnd = () => {}
}

AppRegistry.registerComponent('retro', () => App);
const styles = StyleSheet.create({
  container:  {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#96ceb4'
  },
  wrapper: {
  },
  controlsWrapper: {
    flexDirection: 'row',
    height: 100,
    alignSelf: 'center',
    flex: 1,
  },
  button: {
    height: 50,
    width: 70,
    borderWidth: 2,
    borderRadius: 6,
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 14
  },
  soundContainer: {
    top: -100
  },
  waveContainer: {
    flex: 1,
  },
  artwork: {
    alignSelf: 'center',
    height: 150,
    resizeMode: 'contain',
    width: '100%',
    top: -100,
  }
})
