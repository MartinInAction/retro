// @flow
import React, {PureComponent} from 'react'
import {AppRegistry, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import TextTicker from 'react-native-text-ticker'
import Video from 'react-native-video'
import Equalizer from './components/Equalizer'
import colors from './consts/Colors'
import {getPlaylist, getTrack} from './libs/SoundCloudHelper'

type Track = {
    stream_url: string,
    title: String,
    artwork_url: string,
    wavewaveform_url: string
}

type Playlist = {
  title: string,
  trackCount: number,
  tracks: Array<Track>
}

type Props = {}
type State = {
  activeSongIndex: number,
  isPlaying: boolean,
  track?: Track,
  playlist?: Playlist,
  percentPlayable: number,
  percentPlayed: number,
  audiDuration: number
}
// https://api.soundcloud.com/tracks/462716859?client_id=95f22ed54a5c297b1c41f72d713623ef
export class App extends PureComponent<Props, State> {
  state = {
    activeSongIndex: 0,
    isPlaying: false,
    track: undefined,
    playlist: undefined,
    percentPlayable: 1,
    percentPlayed: 0,
    audiDuration: 0
  }

  audioRef: ?Object

  componentDidMount () {
    /* getTrack(TEST_TRACK)
      .then((track) => this.setState({track}))
      .catch(() => {}) */
    getPlaylist()
      .then((playlist) => this.setState({playlist}))
      .catch(() => { })
  }

  render (): React$Node {
    let {isPlaying} = this.state
    let activeSong = this.getActiveSong()
    return <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <SafeAreaView>
        <View style={styles.wrapper}>
          <View style={styles.titleWrapper}>
            <TextTicker
              style={styles.title}
              duration={5000}
              loop
              repeatSpacer={50}
              marqueeDelay={0}
            >
              {activeSong?.title}
            </TextTicker>
          </View>
          <Image source={{uri: activeSong?.artwork_url}} style={styles.artwork} />
          <View style={styles.equalizerContainer}>
            <Equalizer isActive={isPlaying} />
          </View>
          {this.renderSound()}
          <View style={styles.controlsWrapper}>
            <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={this.prevSong}><Text>PREV</Text></TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => this.setState({isPlaying: !isPlaying})}><Text>{isPlaying ? 'PAUSE' : 'PLAY'}</Text></TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={this.nextSong}><Text>NEXT</Text></TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  }

  renderSound= () => {
    let {isPlaying} = this.state
    let activeSong = this.getActiveSong()
    console.log(activeSong)
    return <View style={styles.soundContainer}>
      <Video
        source={{uri: activeSong?.stream_url}}
        ref={this.setAudioRef}
        volume={8}
        muted={false}
        onLoad={this.onAudioLoad}
        paused={!isPlaying}
        playInBackground
        playWhenInactive
        onProgress={this.onPlayProgress}
        onEnd={this.onPlayEnd}
        repeat={false}
      />
    </View>
  }

  getActiveSong = () => {
    let {playlist, activeSongIndex} = this.state
    if (!playlist) return undefined
    return playlist?.tracks[activeSongIndex]
  }

  nextSong = () => {
    let {activeSongIndex} = this.state
    this.setState({activeSongIndex: activeSongIndex + 1})
  }

  prevSong = () => {
    let {activeSongIndex} = this.state
    if (activeSongIndex === 0) return
    this.setState({activeSongIndex: activeSongIndex - 1})
  }

  setTime = (percentage: number) => {
    let {audiDuration} = this.state
    percentage = (percentage / 100) * 0.88
    let newTime = (audiDuration * percentage) * 0.45
    this.audioRef?.seek(newTime)
    this.setState({percentPlayed: (percentage * 0.88)})
  }

  onAudioLoad = (audioProps: Object) => {
    this.setState({audiDuration: audioProps.duration})
  }

  onPlayProgress = (timerObject: Object) => {
    let {currentTime, playableDuration} = timerObject
    let percentPlayed = currentTime / playableDuration
    this.setState({percentPlayed: percentPlayed})
  }

  setAudioRef = (ref: Object) => this.audioRef = ref

  onPlayEnd = () => {}
}

AppRegistry.registerComponent('retro', () => App)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.green
  },
  wrapper: {
  },
  controlsWrapper: {
    flexDirection: 'row',
    height: 100,
    alignSelf: 'center',
    flex: 1
  },
  button: {
    height: 50,
    width: 70,
    borderWidth: 1,
    borderRadius: 6,
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 14
  },
  soundContainer: {},
  equalizerContainer: {
    flex: 1,
    // minHeight: 70,
    marginBottom: 10
  },
  artwork: {
    alignSelf: 'center',
    height: 220,
    resizeMode: 'contain',
    width: '100%'
  },
  titleWrapper: {
    width: '55%',
    alignSelf: 'center',
    marginLeft: 20,
    marginBottom: 20,
    marginRight: 20
  },
  title: {

  }
})
