// TO-CLEAN: handle errors in each step of order process

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import {
  selectCurrentUser,
  selectCurrentUserIsLoading,
  selectCurrentUserError,
  selectCheckoutUserSuccess,
} from "../../store/user/user.selector";
import { selectCartItems } from "../../store/cart/cart.selector";

import { manageCheckoutUserStart } from "../../store/user/user.action";

import CheckoutForm from "../../components/checkout-form/checkout-form.component";
import CartItem from "../../components/cart-item/cart-item.component";
import Loading from "../../components/loading/loading.component";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import CartEmpty from "../../components/cart-empty/cart-empty.component";

const CheckoutUser = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isLoading = useSelector(selectCurrentUserIsLoading);
  const error = useSelector(selectCurrentUserError);
  const checkoutUserSuccess = useSelector(selectCheckoutUserSuccess);

  const cartItems = useSelector(selectCartItems);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle changes in CheckoutForm
  const defaultFields = {
    firstName: "",
    lastName: "",
    email: "",
    country: "Singapore",
    address: "",
    unitNumber: "",
    postalCode: "",
    phoneNumber: "",
    additionalNotes: "",
  };

  const [formFields, setFormFields] = useState(defaultFields);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (currentUser) {
      setFormFields({
        ...defaultFields,
        ...currentUser,
      });
    } else {
      setFormFields(defaultFields);
    }
  }, [currentUser]);

  const handleFieldChange = (event) => {
    const { id, value } = event.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      [id]: value,
    }));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Handle submit button - place order
  // Handle submit button - place order
  const confirmUser = async (e) => {
    e.preventDefault();

    // Step 1: If no currentUser, create currentUser. Else, update currentUser.
    dispatch(
      manageCheckoutUserStart({
        additionalDetails: formFields,
        password: password,
      })
    );
  };

  useEffect(() => {
    // Step 2: Navigate to Checkout page only if step 1 is successful
    if (!isLoading && !error && currentUser && checkoutUserSuccess) {
      navigate("/checkout", { replace: true });
    }
  }, [isLoading, error, currentUser, checkoutUserSuccess]);

  if (isLoading || (!isLoading && checkoutUserSuccess)) {
    return <Loading />;
  }

  return (
    <Box
      sx={{
        p: 3,
      }}
    >
      <Typography variant="h4" marginBottom="10px">
        Your Details
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={6}>
          <form onSubmit={confirmUser}>
            <CheckoutForm
              formFields={formFields}
              password={password}
              handleFieldChange={handleFieldChange}
              handlePasswordChange={handlePasswordChange}
              currentUser={currentUser}
              errorMessage={error ? error.message : null}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{ margin: "0.8em 0" }}
            >
              Continue to booking
            </Button>
          </form>
        </Grid>
        <Grid
          item
          md={6}
          sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
        >
          {cartItems.length ? (
            <Box>
              {cartItems.map((cartItem) => (
                <CartItem key={cartItem.cartItemId} cartItem={cartItem} />
              ))}
            </Box>
          ) : (
            <CartEmpty />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckoutUser;
