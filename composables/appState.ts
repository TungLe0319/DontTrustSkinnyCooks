// export const useSelectedCategory ('selectedState',()=>{
//   selectedCategory = []
// })
export const useCounter = () => useState<number>("counter", () => 0);

export const useSelectedCategory = () =>
  useState<string[]>("selectedCategory", () => []);

  export const useSelectedRating = () => useState<number>('selectedRating',()=>0)