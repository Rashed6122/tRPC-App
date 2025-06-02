import { trpc } from "../../lib/trpc";
import { useAuth } from "../useAuth";

export const useCreateCategory = () => {
  const user  = useAuth().getUser();
  const context = trpc.useUtils();
  return trpc.category.create.useMutation({
    onMutate: (category) => {
      context.category.getAll.setData({id: user.id}, (old) => {
        if (!old) return;
        return [
          ...old,
          {
            id :"",
            name: category.name
          },
        ];
      });
    },
  });
};

export const useCreateCategoryForAll = () => {
  const user  = useAuth().getUser();
  const context = trpc.useUtils();
  return trpc.category.createForAll.useMutation({
    onMutate: (category) => {
      context.category.getAll.setData({id: user.id}, (old) => {
        if (!old) return;
        return [
          ...old,
          {
            id :"",
            name: category.name
          },
        ];
      });
    },
  });
};
 
