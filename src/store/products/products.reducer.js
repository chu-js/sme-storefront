import { PRODUCTS_ACTION_TYPES } from "./products.types";

export const PRODUCTS_INITIAL_STATE = {
  products: [],
  mapProductsContent: [],
  contentAndOptions: [],
  isLoading: false,
  error: null,
};

export const productsReducer = (
  state = PRODUCTS_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_START:
      return { ...state, isLoading: true };

    case PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: payload.products,
        mapProductsContent: payload.mapProductsContent,
        contentAndOptions: payload.contentAndOptions,
        isLoading: false,
      };

    case PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };

    default:
      return state;
  }
};
