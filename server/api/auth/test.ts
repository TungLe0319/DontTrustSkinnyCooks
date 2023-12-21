import { authOptions } from './[...]'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event, authOptions)
  // const jwt = await getServerToken(event, authOptions)
  console.log({ session })

  return { session }
})
