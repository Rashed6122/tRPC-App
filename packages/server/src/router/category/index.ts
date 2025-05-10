import {trpc} from "../../lib/trpc";
import * as queries from "./queries";

const categoriesRouter = trpc.router(
    {
        ...queries,
    }
);

export default categoriesRouter;