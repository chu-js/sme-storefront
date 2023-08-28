import { all, call } from "redux-saga/effects";

import { productsSaga } from "./products/products.saga";
import { userSaga } from "./user/user.saga";
import { cartSaga } from "./cart/cart.saga";

export function* rootSaga() {
  yield all([call(productsSaga), call(userSaga), call(cartSaga)]);
}
