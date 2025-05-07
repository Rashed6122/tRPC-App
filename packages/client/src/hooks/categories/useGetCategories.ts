import { trpc } from "../../lib/trpc";

export const useGetCategories = () => {
    const { data: categories } = trpc.category.getAll.useQuery(
        { id: "cmachkfdy0001v2wcb67m4pr0" },
        {
          initialData: [],
        }
      );
  return {
    data: categories,
  };
};
