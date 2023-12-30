export async function useCollections() {
  return await useFetch<Collection[]>('/api/account/collections')
}
