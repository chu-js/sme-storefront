import { takeLatest, all, call, put } from "redux-saga/effects";

import {
  getProducts,
  getMapProductsContent,
  getContentAndOptions,
} from "../../utils/firebase/firebase.utils";

import { fetchProductsSuccess, fetchProductsFailure } from "./products.action";

import { PRODUCTS_ACTION_TYPES } from "./products.types";

export function* fetchProductsAsync() {
  try {
    const products = yield call(getProducts);
    const mapProductsContent = yield call(getMapProductsContent);
    const contentAndOptions = yield call(getContentAndOptions);
    yield put(
      fetchProductsSuccess({ products, mapProductsContent, contentAndOptions })
    );
  } catch (error) {
    yield put(fetchProductsFailure(error));
  }
}

export function* onFetchProducts() {
  yield takeLatest(
    PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_START,
    fetchProductsAsync
  );
}

export function* productsSaga() {
  yield all([call(onFetchProducts)]);
}
