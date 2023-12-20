
import { getServerSession, getServerToken } from "#auth"
import { authOptions } from "./[...]";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event, authOptions)
  const jwt = await getServerToken(event, authOptions)
  console.log({ session, jwt});
  
  return { session, jwt }
})