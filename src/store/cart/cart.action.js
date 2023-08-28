import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";
import { v4 as uuidv4 } from "uuid";

// 1. Add cart item
const addCartItem = (cartItems, productToAdd, selectedOptions) => {
  return [
    ...cartItems,
    {
      ...productToAdd,
      cartItemId: "cart" + uuidv4(),
      quantity: 1,
      selectedOptions,
    },
  ];
};

// 2. Clear one cart item
const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter(
    (cartItem) => cartItem.cartItemId !== cartItemToClear.cartItemId
  );

// 3. Clear all cart items
const clearAllCartItems = () => [];

// 4. Update selected timeslot for cart item
const updateCartItemTimeslot = (cartItems, cartItemToUpdate, timeslot) => {
  return cartItems.map((cartItem) =>
    cartItem.cartItemId === cartItemToUpdate.cartItemId
      ? { ...cartItem, selectedTimeslot: timeslot }
      : cartItem
  );
};

// Create reducer actions: will update cartItems and re-render selectors of cartCount & cartTotal
// 1. Add cart item
export const addItemToCart = (cartItems, productToAdd, selectedOptions) => {
  const newCartItems = addCartItem(cartItems, productToAdd, selectedOptions);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

// 2. Clear one cart item
export const clearItemFromCart = (cartItems, cartItemToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

// 3. Clear all cart items
export const clearAllItemsFromCart = () => {
  const newCartItems = clearAllCartItems();
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

// 4. Update selected timeslot for cart item
export const updateCartItemTimeslotinCart = (
  cartItems,
  cartItemToUpdate,
  timeslot
) => {
  const newCartItems = updateCartItemTimeslot(
    cartItems,
    cartItemToUpdate,
    timeslot
  );
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

// 5. Fetch available slots start
export const fetchAvailableSlotsStart = () =>
  createAction(CART_ACTION_TYPES.FETCH_AVAILABLE_SLOTS_START);

// 6. Fetch available slots success
export const fetchAvailableSlotsSuccess = (availableSlots) =>
  createAction(CART_ACTION_TYPES.FETCH_AVAILABLE_SLOTS_SUCCESS, availableSlots);

// 7. Fetch available slots failure
export const fetchAvailableSlotsFailure = (error) =>
  createAction(CART_ACTION_TYPES.FETCH_AVAILABLE_SLOTS_FAILURE, error);
