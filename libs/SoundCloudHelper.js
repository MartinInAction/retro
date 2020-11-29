// @flow
const CLIENT_ID = '95f22ed54a5c297b1c41f72d713623ef' // '38kZjAWhqvwrcMFKFo3496SY4OsSovTU' // '95f22ed54a5c297b1c41f72d713623ef' // '95f22ed54a5c297b1c41f72d713623ef'
const API = 'https://api.soundcloud.com'
// const API_V2 = ' https://api-v2.soundcloud.com'

export const getTrack = (trackId: string) => {
  return sendRequest(`/tracks/${trackId}/`)
    .then((res) => ({
      ...res,
      stream_url: attachClientId(res.stream_url)
    }))
}

export const getPlaylist = (playlistId: string) => {
  return sendRequest(`/playlists/${playlistId}`)
    .then((playlist) => ({
      title: playlist.title,
      trackCount: playlist.track_count,
      tracks: shuffleArray(playlist.tracks.map(mapTrack))
    }))
}

export const mapTrack = (track: Object) => ({
  ...track,
  stream_url: attachClientId(track.stream_url)
})

const attachClientId = (url) => `${url}?client_id=${CLIENT_ID}`

const sendRequest = (uri: string) => {
  let url = attachClientId(API + uri)
  console.log(url)
  return fetch(url)
    .then((res) => {
      if (res.status >= 300) return Promise.reject(res)
      return res
    })
    .then((res) => res.json())
    .catch((err) => {
      console.warn(err)
    })
}

export let shuffleArray = (array: Array<*>): Array<*> => {
  return array.sort(() => 0.5 - Math.random())
}

// https://api.soundcloud.com/tracks/462716859/stream?client_id=95f22ed54a5c297b1c41f72d713623ef
// 462716859
