import '#internal/nitro/virtual/polyfill'
import { Server } from 'node:http'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { mkdirSync } from 'node:fs'
import { parentPort, threadId } from 'node:worker_threads'
import { isWindows, provider } from 'std-env'
import {
  toNodeListener,
} from 'h3'

// import { Server as WSServer } from 'ws'

// import { nitroApp } from '../app'

// @ts-expect-error it is there
import { trapUnhandledNodeErrors } from '#internal/nitro/utils'
import { socketHandler } from '~/server/socket/handler'

// import { runNitroTask } from '../task'
// import { tasks } from '#internal/nitro/virtual/tasks'

const nitroApp = useNitroApp()
const server = new Server(toNodeListener(nitroApp.h3App))
// const io = new SocketServer(server)
const io = socketHandler(server)
nitroApp.hooks.hook('request', (event) => {
  event.context.io = io
})
function getAddress() {
  if (
    provider === 'stackblitz'
    || process.env.NITRO_NO_UNIX_SOCKET
    || process.versions.bun
  )
    return 0

  const socketName = `worker-${process.pid}-${threadId}.sock`
  if (isWindows) {
    return join('\\\\.\\pipe\\nitro', socketName)
  }
  else {
    const socketDir = join(tmpdir(), 'nitro')
    mkdirSync(socketDir, { recursive: true })
    return join(socketDir, socketName)
  }
}

const listenAddress = getAddress()
const listener = server.listen(listenAddress, () => {
  const _address = server.address()
  parentPort?.postMessage({
    event: 'listen',
    address:
      typeof _address === 'string'
        ? { socketPath: _address }
        : { host: 'localhost', port: _address?.port },
  })
})

// Trap unhandled errors
trapUnhandledNodeErrors()

// Graceful shutdown
async function onShutdown(signal?: string) {
  await nitroApp.hooks.callHook('close')
}

parentPort?.on('message', async (msg) => {
  if (msg && msg.event === 'shutdown') {
    await onShutdown()
    parentPort?.postMessage({ event: 'exit' })
  }
})
