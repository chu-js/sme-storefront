import { createSelector } from "reselect";

// Extract cart slice of reducer from root reducer.
const selectCartReducer = (state) => state.cart;

// CART ITEMS
export const selectCartItems = createSelector(
  [selectCartReducer],
  (cartSlice) => cartSlice.cartItems
);

// CART COUNT
export const selectCartCount = createSelector(
  [selectCartItems],
  (newCartItems) =>
    newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

// CART TOTAL BEFORE ALL DISCOUNTS
export const selectCartTotalBeforeDiscount = createSelector(
  [selectCartItems],
  (newCartItems) =>
    newCartItems.reduce(
      (total, cartItem) =>
        total + cartItem.quantity * cartItem.totalPriceBeforeFwDiscount,
      0
    )
);

// CART TOTAL BEFORE TWO TOILET DISCOUNTS, AFTER FLOOR + WALL (FULL) PACKAGE DISCOUNT
export const selectCartTotalBeforeTwoToiletDiscount = createSelector(
  [selectCartItems],
  (newCartItems) => {
    // Calculate total before 2-toilet discount is applied using discounted price for Floor + Wall products
    const cartTotalWithoutTwoToiletDiscount = newCartItems.reduce(
      (total, cartItem) =>
        total +
        cartItem.quantity *
          (cartItem.totalPrice !== ""
            ? cartItem.totalPrice
            : cartItem.totalPriceBeforeFwDiscount),
      0
    );
    return cartTotalWithoutTwoToiletDiscount;
  }
);

// FINAL CART TOTAL
export const selectCartTotal = createSelector(
  [selectCartItems, selectCartTotalBeforeTwoToiletDiscount, selectCartCount],
  (newCartItems, cartTotalBeforeTwoToiletDiscount, cartCount) => {
    // Calculate total before 2-toilet discount is applied using discounted price for Floor + Wall products
    if (cartCount < 2) {
      return cartTotalBeforeTwoToiletDiscount;
    } else {
      let count = 0;
      for (let i = 0; i < newCartItems.length; i++) {
        if (newCartItems[i].c43_two_toilet_discount === 1) {
          count += newCartItems[i].quantity;
        }
      }
      // if (count >= 2) {
      return cartTotalBeforeTwoToiletDiscount - 20 * count;
      // } else {
      //   return totalWithoutTwoToiletDiscount;
      // }
    }
  }
);

// DISCOUNT FOR TWO TOILETS
export const selectTotalDiscountForTwoToilets = createSelector(
  [selectCartTotalBeforeTwoToiletDiscount, selectCartTotal],
  (cartTotalBeforeTwoToiletDiscount, cartTotal) =>
    cartTotalBeforeTwoToiletDiscount - cartTotal
);
