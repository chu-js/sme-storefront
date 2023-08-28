import { USER_ACTION_TYPES } from "./user.types";

const USER_INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null,
  checkoutUserSuccess: false,
};

export const userReducer = (state = USER_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.EMAIL_SIGN_IN_START:
    case USER_ACTION_TYPES.GOOGLE_SIGN_IN_START:
    case USER_ACTION_TYPES.SIGN_UP_START:
    case USER_ACTION_TYPES.MANAGE_CHECKOUT_USER_START:
    case USER_ACTION_TYPES.SIGN_OUT_START:
    case USER_ACTION_TYPES.CHECK_USER_SESSION:
      return {
        ...state,
        isLoading: true,
        error: null,
        checkoutUserSuccess: false,
      };

    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
    case USER_ACTION_TYPES.UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentUser: payload,
      };

    case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
    case USER_ACTION_TYPES.AUTH_CHECK_EMPTY:
      return {
        ...state,
        isLoading: false,
        currentUser: null,
      };

    case USER_ACTION_TYPES.SIGN_IN_FAILURE:
    case USER_ACTION_TYPES.SIGN_UP_FAILURE:
    case USER_ACTION_TYPES.SIGN_OUT_FAILURE:
    case USER_ACTION_TYPES.UPDATE_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case USER_ACTION_TYPES.MANAGE_CHECKOUT_USER_SUCCESS:
      return {
        ...state,
        checkoutUserSuccess: true,
      };

    default:
      return state;
  }
};
