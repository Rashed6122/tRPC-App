import trpc from "../../lib/trpc";
import * as mutations from "./mutations";

const authRouter = trpc.router({
  ...mutations,
});

export default authRouter;
