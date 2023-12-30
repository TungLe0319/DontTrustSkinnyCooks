// export const useFilterCategories ('selectedState',()=>{
//   selectedCategory = []

// })
export const useCounter = () => useState<number>('counter', () => 0)

export const useSelectedRating = () => useState<number>('selectedRating', () => 0)

export function formateDate(date: Date) {
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
