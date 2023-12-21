import { getServerSession } from '@hebilicious/authjs-nuxt/dist/runtime/lib/server'
import type { EventHandler, EventHandlerRequest, H3Event } from 'h3'
import { authOptions } from '../api/auth/[...]'

export async function useAuthSession(event: H3Event) {
  const session = await getServerSession(event, authOptions)
  return session
}

export async function requireAuthSession(event: H3Event) {
  const session = await useAuthSession(event)
  if (!session || !session.user?.id) {
    throw createError({
      message: 'Not Authorized',
      statusCode: 401,
    })
  }
  return session
}

export function defineAuthRequiredHandler<T extends EventHandlerRequest, D>(handler: EventHandler<T, D>): EventHandler<T, D> {
  return defineEventHandler<T>(async (event) => {
    try {
      const session = await requireAuthSession(event)
      return await handler(event)
    }
    catch (err) {
      return createError('Not Authorized')
    }
  })
}

export function defineRequiredHandler<T extends EventHandlerRequest, D>(handler: EventHandler<T, D>, tag: string): EventHandler<T, D> {
  return defineEventHandler<T>(async (event) => {
    try {
      const session = await requireAuthSession(event)
      return await handler(event)
    }
    catch (err) {
      console.error(`[${tag}]:`, err)
      // Error handling
      return createError('Not Authorized')
    }
  })
}
