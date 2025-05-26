import { trpc } from "../../lib/trpc";

export const useGetUsers = () => {
    const { data: users } = trpc.todo.getUsers.useQuery(
        undefined,
        {
          initialData: [],
        }
      );
  return {
    data: users,
  };
};
