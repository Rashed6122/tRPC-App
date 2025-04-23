import { create } from "zustand";
import { Todo } from "../models/Todo";

interface TrashStore {
  trashList: Todo[];
  setTrashList: (trashList: Todo[]) => void;
}

const TrashStore = create<TrashStore>((set) => ({
  trashList: [],
  setTrashList: (trashList) => {
    set(() => ({
      trashList: trashList,
    }));
  },
}));

export default TrashStore;
