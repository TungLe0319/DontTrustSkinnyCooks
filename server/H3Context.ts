import type { Server as SocketServer } from 'socket.io'

declare module 'h3' {
  interface H3EventContext {
    io?: SocketServer
  }
}
