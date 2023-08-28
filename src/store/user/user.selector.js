export const selectCurrentUser = (state) => state.user.currentUser;
export const selectCurrentUserError = (state) => state.user.error;
export const selectCurrentUserIsLoading = (state) => state.user.isLoading;
export const selectCheckoutUserSuccess = (state) =>
  state.user.checkoutUserSuccess;
