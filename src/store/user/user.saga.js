import { takeLatest, put, all, call } from "redux-saga/effects";

import { USER_ACTION_TYPES } from "./user.types";

import {
  signInSuccess,
  signInFailure,
  signUpSuccess,
  signUpFailure,
  signOutSuccess,
  signOutFailure,
  updateUserSuccess,
  updateUserFailure,
  authCheckEmpty,
  manageCheckoutUserSuccess,
} from "./user.action";

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
  updateUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

// 1. Check user session.
// 2. Google sign in.
// 3. Email sign in.
// Step 3: Create userDoc in collection if userSnapshot cannot be found. Dispatch signInSuccess/signInFailure.
// 4. Email sign up. Step 5.
// 6. Update Firestore user doc. Step 5(else).
export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

// 1. Check user session. Step 2: Run async function to getCurrentUser using onAuthStateChanged.
export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) {
      yield put(authCheckEmpty());
      return;
    }
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

// 2. Google sign in. Step 2: Run async function to signInWithGooglePopup.
export function* signInWithGoogle() {
  try {
    const { user, firstName, lastName } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user, { firstName, lastName });
  } catch (error) {
    yield put(signInFailure(error));
  }
}

// 3. Email sign in. Step 2: Run async function to signInAuthUserWithEmailAndPassword.
export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

// 4. Email sign up. Step 2: Run async function to createAuthUserWithEmailAndPassword. Dispatch signUpSuccess/signUpFailure.
export function* signUp({ payload: { email, password, firstName, lastName } }) {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield put(signUpSuccess(user, { firstName, lastName }));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

// 4. Email sign up. Step 4: Run getSnapshotFromUserAuth.
// 6. Update Firestore user doc. Step 4(else): Sign in after sign up user in Firestore auth.
export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
  yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

// 5. Sign out. Step 2: Run async function to signOutUser. Dispatch signOutSuccess/signOutFailure.
export function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

// 6. Update Firestore user doc. Step 2: if-else logic based on whether user has already been created.
export function* manageCheckoutUser({
  payload: { additionalDetails, password },
}) {
  try {
    const userAuth = yield call(getCurrentUser);
    if (userAuth) {
      // Update user doc in firestore
      yield call(updateUserDocumentFromAuth, userAuth, additionalDetails);
      yield put(updateUserSuccess(additionalDetails));
    } else {
      // Create a new user in Firebase Auth
      const { user } = yield call(
        createAuthUserWithEmailAndPassword,
        additionalDetails.email,
        password
      );
      yield put(signUpSuccess(user, additionalDetails));
    }
    yield put(manageCheckoutUserSuccess());
  } catch (error) {
    yield put(updateUserFailure(error));
  }
}

// 1. Check user session. Step 1: Listen for checkUserSession action.
export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

// 2. Google sign in. Step 1: Listen for googleSignInStart action.
export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

// 3. Email sign in. Step 1: Listen for emailSignInStart action.
export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

// 4. Email sign up. Step 1: Listen for signUpStart action.
export function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

// 4. Email sign up. Step 3: Listen for signUpSuccess action.
// 6. Manage checkout user. Step 3(else): Listen for signUpSuccess action.
export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

// 5. Sign out. Step 1: Listen for signOutStart action.
export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

// 6. Manage checkout user. Step 1: Listen for manageCheckoutUserStart action.
export function* onManageCheckoutUserStart() {
  yield takeLatest(
    USER_ACTION_TYPES.MANAGE_CHECKOUT_USER_START,
    manageCheckoutUser
  );
}

export function* userSaga() {
  yield all([
    // 1. Check user session
    call(onCheckUserSession),
    // 2. Google sign in
    call(onGoogleSignInStart),
    // 3. Email sign in
    call(onEmailSignInStart),
    // 4. Email sign up
    call(onSignUpStart),
    // 4. Email sign in after sign up
    call(onSignUpSuccess),
    // 5. Sign out
    call(onSignOutStart),
    // 6. Manage checkout user
    call(onManageCheckoutUserStart),
  ]);
}
