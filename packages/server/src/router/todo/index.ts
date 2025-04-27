import trpc from "../../lib/trpc";
import * as queries from "./queries";
import * as mutations from "./mutations";

const todoRouter = trpc.router({
  ...queries,
  ...mutations,
});

export default todoRouter;
