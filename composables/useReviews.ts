export const useReviews = async (id: string) => await useFetch(`/api/recipes/${id}/reviews`)
