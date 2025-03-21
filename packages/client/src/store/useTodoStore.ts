import { create } from 'zustand'

interface TitleStore {
    title: string,
    setTitle: (title: string) => void
}

const useStore = create<TitleStore>((set) => ({
  title: '',
  setTitle: (newTitle: string) => set({ title: newTitle }),
}))

export default useStore;
