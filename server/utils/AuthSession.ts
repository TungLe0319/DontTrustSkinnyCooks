import { getServerSession } from '@hebilicious/authjs-nuxt/dist/runtime/lib/server';
import type { H3Event } from 'h3'
import { authOptions } from '../api/auth/[...]';
import type { EventHandler, EventHandlerRequest } from 'h3'

export const useAuthSession = async(event: H3Event) => {
  const session = await getServerSession(event, authOptions)
  return session
}

export const requireAuthSession = async(event: H3Event) => {
  const session = await useAuthSession(event)
  if (!session || !session.user?.id) {
    throw createError({
      message: 'Not Authorized',
      statusCode: 401,
    })
  }
  return session
}



export const defineAuthRequiredHandler = <T extends EventHandlerRequest, D> (
  handler: EventHandler<T, D>
): EventHandler<T, D> =>
    defineEventHandler<T>(async (event) => {
      try {
        const session = await requireAuthSession(event)
        return await handler(event)
      } catch (err) {
        return createError('Not Authorized')
      }
    })


export const defineRequiredHandler = <T extends EventHandlerRequest, D> (
  handler: EventHandler<T, D>,
  tag: string
): EventHandler<T, D> =>
    defineEventHandler<T>(async (event) => {
      try {
        const session = await requireAuthSession(event)
        return await handler(event)
      } catch (err) {
        console.error(`[${tag}]:`, err)
      // Error handling
        return createError('Not Authorized')
      }
    })
