import type { IncomingMessage, Server, ServerResponse } from 'node:http'
import { Server as SocketServer } from 'socket.io'

// import { useTurso } from '~/utils/turso'

export function socketHandler(server: Server<typeof IncomingMessage, typeof ServerResponse>) {
//   console.log('✔️ Hello from the socket handler')

  const io = new SocketServer(server)
  //   const threads = await getThreads()

  io.on('connection', (socket) => {
    // console.log('socket connected', socket.id)
    // socket.on('disconnect', () => {
    //   console.log('socket disconnected', socket.id)
    // })

    socket.on('joinRoom', (room, user) => {
      socket.join(room)
      //   if (room === 'general') {
      //     setInterval(() => {
      //       io.to(room).emit('message', 'hello from server')
      //     }, 1000)
      //   }

      console.log(`[Socket.io] joinRoom ${room}`)

    //   io.to(room).emit('join', {
    //     from_id: user.id,
    //     from_name: user.name,
    //     system: true,
    //     content: `${user.name ?? user.id} joined the thread`,
    //   })
    })

    socket.on('leaveRoom', (room, user) => {
      socket.leave(room)
      io.to(room).emit('leave', {
        from_id: user.id,
        from_name: user.name,
        system: true,
        content: `${user.name ?? user.id} left the thread`,
      })
    })

    socket.on('message', (room, message) => {
      console.log(`[Socket.io] message received room ${room}`)
    //   const thread = threads.find(t => t.id == room)
    //   if (thread) {
    //     io.to(room).emit('message', message)
    //     if (thread.persist) {
    //       const client = useTurso()
    //       client.execute({
    //         sql: 'INSERT INTO thread_messages (id, thread_id, content, from_name, from_id,created_at) values (?,?,?,?,?,?)',
    //         args: [
    //           null,
    //           room,
    //           message.content,
    //           message.from_name,
    //           message.from_id,
    //           Math.floor((new Date()).getTime() / 1000),
    //         ],
    //       })
    //     }
    //   }
    })
  })

  return io
}
