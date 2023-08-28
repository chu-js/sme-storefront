import { useSelector } from "react-redux";

import { selectCartItems } from "../../store/cart/cart.selector";

import CartItem from "../cart-item/cart-item.component";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CartTotal from "../cart-total/cart-total.component";
import CartEmpty from "../cart-empty/cart-empty.component";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);

  return (
    <Box
      sx={{
        p: 3,
        maxHeight: "70vh",
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Typography variant="h5" sx={{ paddingBottom: "2%" }}>
            Cart
          </Typography>
        </Grid>

        <Grid item xs={9}>
          {/* Snap cart total and checkout buttons to the right. */}
          <Box
            sx={{
              justifyContent: "flex-end",
              display: "flex",
            }}
          >
            {/* Cart total */}
            <CartTotal savingsText="Savings" />
          </Box>
          {/* Checkout buttons */}
          <Box display="flex" justifyContent="flex-end" sx={{ margin: "5% 0" }}>
            <Button href="/cart">View cart</Button>
            <Button href="/checkout-user" variant="contained">
              Checkout
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Box>
        {cartItems.length ? (
          <Box>
            {cartItems.map((cartItem) => (
              <CartItem
                key={cartItem.cartItemId}
                cartItem={cartItem}
                allowDelete
              />
            ))}
          </Box>
        ) : (
          <CartEmpty />
        )}
      </Box>
    </Box>
  );
};

export default CartDropdown;
