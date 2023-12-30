export const useCollections = async () => {
  return await useFetch<Collection[]>('/api/account/collections')
}
