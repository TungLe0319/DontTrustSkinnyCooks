// export const useFilterCategories ('selectedState',()=>{
//   selectedCategory = []

// })
export const useCounter = () => useState<number>('counter', () => 0)

export const useSelectedRating = () => useState<number>('selectedRating', () => 0)

export function formateDate(date: Date | null) {
  if (!date)
    return useState<string>('formateDate', () => '') // or return an appropriate default value

  return useState<string>('formateDate', () => new Date(date).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
  ))
}
export const useFilterCategories = () => useState<string[]>('filterCategories', () => [])

export const useFilterPrepTime = () => useState<number>('filterPrepTime', () => 0)

export const useFilterServingSize = () => useState<number>('filterServingSize', () => 0)

export default function useAverageRating(reviews: { id: number, rating: number }[]) {
  const averageRating = ref<number>(0)

  const calculateAverageRating = (): void => {
    const sumOfRatings = reviews.reduce((sum, review) => sum + review.rating, 0)
    const numberOfReviews = reviews.length

    averageRating.value = numberOfReviews > 0 ? sumOfRatings / numberOfReviews : 0
  }

  calculateAverageRating() // Calculate average immediately on component setup

  return { averageRating }
}
