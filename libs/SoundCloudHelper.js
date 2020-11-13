const CLIENT_ID = '95f22ed54a5c297b1c41f72d713623ef';
const API = 'https://api.soundcloud.com'


export const getTrack = (trackId: string) => {
    return sendRequest(`/tracks/${trackId}`)
}

export const getTrackUrl = (trackId: string) => {
    return attachClientId(`https://api.soundcloud.com/tracks/${trackId}/stream`)
}

const attachClientId = (url) => `${url}?client_id=${CLIENT_ID}`

const sendRequest = (uri: string) => {
    return fetch(attachClientId(API + uri))
        .then((res) => res.json())
        .then((res) => ({
            ...res,
            stream_url: attachClientId(res.stream_url)
        }))
        .catch((err) => {
            console.warn(err)
        })
}
// https://api.soundcloud.com/tracks/462716859/stream?client_id=95f22ed54a5c297b1c41f72d713623ef
// 462716859