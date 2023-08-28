import { takeLatest, all, call, put, select } from "redux-saga/effects";

import { fetchAvailableSlots } from "../../utils/gcalApi/gcalApi.utils";

import {
  fetchAvailableSlotsSuccess,
  fetchAvailableSlotsFailure,
} from "./cart.action";
import { CART_ACTION_TYPES } from "./cart.types";

import { selectCartItems } from "./cart.selector";

export function* fetchAvailableSlotsAsync() {
  try {
    const cartItems = yield select(selectCartItems);
    const responses = yield all(
      cartItems.map((item) =>
        call(
          fetchAvailableSlots,
          item.total_days,
          item.selectedOptions.c42.option
        )
      )
    );
    const updatedCartItems = cartItems.map((item, index) => {
      // Check if the previously selected slot is still available
      const isSlotAvailable = responses[index].some(
        (slot) => JSON.stringify(slot) === JSON.stringify(item.selectedTimeslot)
      );

      return {
        ...item,
        availableSlots: responses[index],
        // If the previously selected slot is not available, set it to null or a default value
        selectedTimeslot: isSlotAvailable ? item.selectedTimeslot : null,
      };
    });

    yield put(fetchAvailableSlotsSuccess(updatedCartItems));
  } catch (error) {
    yield put(fetchAvailableSlotsFailure(error));
  }
}

export function* onFetchAvailableSlots() {
  yield takeLatest(
    CART_ACTION_TYPES.FETCH_AVAILABLE_SLOTS_START,
    fetchAvailableSlotsAsync
  );
}

export function* cartSaga() {
  yield all([call(onFetchAvailableSlots)]);
}
