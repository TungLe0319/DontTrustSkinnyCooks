// export const useSelectedCategory ('selectedState',()=>{
//   selectedCategory = []

import type { Category } from '@prisma/client'

// })
export const useCounter = () => useState<number>('counter', () => 0)

export function useSelectedCategory() {
  return useState<string[]>('selectedCategory', () => [])
}

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
export const useCategories = () => useState<Category[]>('categories', () => [])

