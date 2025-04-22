export interface Todo {
    id: string
    title: string
    isCompleted: boolean
    createdAt: string
    categoryId: string | null
    subTasks: {
        item: string
    }[]
    pinned: boolean 
}