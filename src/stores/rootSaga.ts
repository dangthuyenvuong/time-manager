import { createRootSaga } from "core/utils";
import { authSaga } from "./auth.slice";
import { userSaga } from "./user.slice";

export const rootSaga = createRootSaga([
    authSaga,
    userSaga
])