import { create } from 'zustand'

interface Category {
    id: string
    name: string
}

interface CategoryStore {
    categories: Category[]
    setCategories: (categories: Category[]) => void
}

const CategoryStore = create<CategoryStore>((set) => ({
    categories: [],
    setCategories: (categories) => {
        set(() => ({
            categories:  categories,
        }))
    },
}))

export default CategoryStore;
