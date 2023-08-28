import { PRODUCTS_ACTION_TYPES } from "./products.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const fetchProductsStart = () =>
  createAction(PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_START);

export const fetchProductsSuccess = (products) =>
  createAction(
    PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_SUCCESS,
    products
  );

export const fetchProductsFailure = (error) =>
  createAction(PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_FAILURE, error);
