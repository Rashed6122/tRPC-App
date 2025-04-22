import { create } from 'zustand'

interface Todo {
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

interface TodosStore {
    todos: Todo[]
    todosList: Todo[]
    setTodos: (todos: Todo[]) => void
    setTodosList: (todos: Todo[]) => void
}


const todosStore = create<TodosStore>((set) => ({
    todos: [],
    todosList: [],
    setTodos: (todos) => {
        set(() => ({
            todos:  todos,
        }))
    },
    setTodosList: (todos) => {
        set(() => ({
            todosList:  todos,
        }))
    },
}))

export default todosStore;
