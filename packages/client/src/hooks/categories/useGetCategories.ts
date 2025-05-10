import { trpc } from "../../lib/trpc";
import { useAuth } from "../useAuth";

export const useGetCategories = () => {
    const user  = useAuth().getUser();
    const { data: categories } = trpc.category.getAll.useQuery(
        { id: user.id },
        {
          initialData: [],
        }
      );
  return {
    data: categories,
  };
};
