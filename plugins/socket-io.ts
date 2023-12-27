import { io } from 'socket.io-client'

export default defineNuxtPlugin((nuxtApp) => {
  const _io = io()
  //   console.log('injecting io into nuxtApp' );
  _io.on('connect', () => {
    console.log('socket connected on client', _io.id)
  })

//   _io.emit('joinRoom', 'general')
//   _io.on('message', (message) => {
//     console.log('message received', message)
//   })
  return {
    provide: {
      io: _io,
    },
  }
})
