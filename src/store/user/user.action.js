import { USER_ACTION_TYPES } from "./user.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const checkUserSession = () =>
  createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const authCheckEmpty = () =>
  createAction(USER_ACTION_TYPES.AUTH_CHECK_EMPTY);

export const googleSignInStart = () =>
  createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);

export const emailSignInStart = (email, password) =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password });

export const signInSuccess = (user) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);

export const signInFailure = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_FAILURE, error);

export const signUpStart = (email, password, firstName, lastName) =>
  createAction(USER_ACTION_TYPES.SIGN_UP_START, {
    email,
    password,
    firstName,
    lastName,
  });

export const signUpSuccess = (user, additionalDetails) =>
  createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalDetails });

export const signUpFailure = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_UP_FAILURE, error);

export const signOutStart = () =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_START);

export const signOutSuccess = () =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);

export const signOutFailure = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_FAILURE, error);

export const manageCheckoutUserStart = (additionalDetails) =>
  createAction(USER_ACTION_TYPES.MANAGE_CHECKOUT_USER_START, additionalDetails);

export const updateUserSuccess = (user) =>
  createAction(USER_ACTION_TYPES.UPDATE_USER_SUCCESS, user);

export const updateUserFailure = (error) =>
  createAction(USER_ACTION_TYPES.UPDATE_USER_FAILURE, error);

export const manageCheckoutUserSuccess = () =>
  createAction(USER_ACTION_TYPES.MANAGE_CHECKOUT_USER_SUCCESS);
