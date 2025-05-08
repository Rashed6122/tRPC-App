import { create } from 'zustand'

type User = {
  id: string
  name: string
  email: string
}

type UserStore = {
    user?: User
    setUser: (u: User) => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: undefined,
  setUser: (user) => set({ user }),
}))
