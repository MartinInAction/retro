// @flow
const CLIENT_ID = '95f22ed54a5c297b1c41f72d713623ef' // '95f22ed54a5c297b1c41f72d713623ef'
const API = 'https://api.soundcloud.com'

export const getTrack = (trackId: string) => {
  return sendRequest(`/tracks/${trackId}/`)
    .then((res) => ({
      ...res,
      stream_url: attachClientId(res.stream_url)
    }))
}

export const getPlaylist = () => {
  return sendRequest(`/playlists/1146947782`)
    .then((playlist) => ({
      title: playlist.title,
      trackCount: playlist.track_count,
      tracks: playlist.tracks.map(mapTrack)
    }))
}

export const mapTrack = (track: Object) => ({
  ...track,
  stream_url: attachClientId(track.stream_url)
})

export const getTrackUrl = (trackId: string) => {
  return attachClientId(`https://api-v2.soundcloud.com/tracks/${trackId}/stream`)
}

const attachClientId = (url) => `${url}?client_id=${CLIENT_ID}`

const sendRequest = (uri: string) => {
  let url = attachClientId(API + uri)
  return fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      console.warn(err)
    })
}
// https://api.soundcloud.com/tracks/462716859/stream?client_id=95f22ed54a5c297b1c41f72d713623ef
// 462716859
