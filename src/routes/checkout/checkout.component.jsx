import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { v4 as uuidv4 } from "uuid";

import {
  selectCartItems,
  selectCartTotal,
  selectCartTotalBeforeTwoToiletDiscount,
  selectTotalDiscountForTwoToilets,
} from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { clearAllItemsFromCart } from "../../store/cart/cart.action";

import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import { bookSlot } from "../../utils/gcalApi/gcalApi.utils";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import CartItem from "../../components/cart-item/cart-item.component";
import PaymentForm from "../../components/payment-form/payment-form.component";
import CartEmpty from "../../components/cart-empty/cart-empty.component";
import { createOrderDocument } from "../../utils/firebase/firebase.utils";

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalBeforeTwoToiletDiscount = useSelector(
    selectCartTotalBeforeTwoToiletDiscount
  );
  const cartTotal = useSelector(selectCartTotal);
  const totalDiscountForTwoToilets = useSelector(
    selectTotalDiscountForTwoToilets
  );
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (!currentUser && cartItems == []) {
      navigate(-1);
    }
    if (!currentUser) {
      navigate("/checkout-user");
    }
  }, []);

  // Stripe
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const amount = useSelector(selectCartTotal);

  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  // Handle submit button - place order
  const placeOrder = async (e) => {
    e.preventDefault();

    // Step 2: Make payment with Stripe
    const paymentHandler = async () => {
      if (!stripe || !elements) {
        return;
      }

      setProcessing(true);

      const response = await fetch(
        "", // Removed: API endpoint for Firebase function
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: amount * 100 }),
        }
      ).then((res) => {
        return res.json();
      });

      const clientSecret = response.paymentIntent.client_secret;

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: currentUser
              ? currentUser.firstName + " " + currentUser.lastName
              : "Guest",
          },
        },
      });

      setProcessing(false);

      if (paymentResult.error) {
        setError(paymentResult.error.message);
        return false;
      } else {
        if (paymentResult.paymentIntent.status === "succeeded") {
          setSucceeded(true);
          setError(null);
          alert("Payment Successful!");
          return true;
        }
      }
    };

    const isPaymentSuccessful = await paymentHandler();

    if (!isPaymentSuccessful) {
      // if paymentHandler returned false, return early
      return;
    }

    // Step 3: Create booking in gcal
    const orderId = "order" + uuidv4();
    const promises = cartItems.map((cartItem) =>
      bookSlot(orderId, cartItem, currentUser)
    );
    try {
      const responsesFromGcalApi = await Promise.all(promises);
      if (responsesFromGcalApi[0].status !== 200) {
        // if booking not added to gcal, return early
        return;
      }
    } catch (error) {
      setError(error.message);
    }

    // Step 4: Create order document in Firestore
    try {
      await createOrderDocument(orderId, cartItems, currentUser);
    } catch (error) {
      setError(error.message);
    }

    // Step 5: Clear cart and navigate to homepage if all processes are completed
    dispatch(clearAllItemsFromCart());
    navigate("/", { replace: true });
  };

  return (
    <Box
      sx={{
        p: 3,
      }}
    >
      {amount == 0 && <CartEmpty />}
      <form onSubmit={placeOrder}>
        {/* Book slots */}
        <>
          <Typography variant="h3">Booking</Typography>
          {cartItems.map((cartItem) => (
            <CartItem
              key={cartItem.cartItemId}
              cartItem={cartItem}
              allowSelectSlots
            />
          ))}
          {cartTotal !== cartTotalBeforeTwoToiletDiscount ? (
            <>
              <Typography color="text.secondary">
                Order Total:{" "}
                <span style={{ textDecoration: "line-through" }}>
                  {" "}
                  ${cartTotalBeforeTwoToiletDiscount}
                </span>
              </Typography>
              <Typography>Savings: -${totalDiscountForTwoToilets}</Typography>
              <Typography color="text.secondary">
                Total Payment: ${cartTotal}
              </Typography>
            </>
          ) : (
            <Typography color="text.secondary">
              Total Payment: ${cartTotal}
            </Typography>
          )}
        </>

        {/* Payment */}
        <PaymentForm
          disabled={disabled}
          setDisabled={setDisabled}
          error={error}
          setError={setError}
          processing={processing}
          succeeded={succeeded}
        />
      </form>
    </Box>
  );
};

export default Checkout;
