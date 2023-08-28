import { useSelector } from "react-redux";

import { selectCartItems } from "../../store/cart/cart.selector";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import CartItem from "../../components/cart-item/cart-item.component";
import CartTotal from "../../components/cart-total/cart-total.component";

const CartPage = () => {
  const cartItems = useSelector(selectCartItems);

  return (
    <Box
      sx={{
        p: 3,
      }}
    >
      <Typography variant="h4">Cart</Typography>
      <Box>
        {cartItems.map((cartItem) => (
          <CartItem key={cartItem.cartItemId} cartItem={cartItem} allowDelete />
        ))}
      </Box>
      <CartTotal
        savingsText="Savings for doing 2 or more toilets (applicable only for $650
            lastic/pebble floor packages)"
      />
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          href="/checkout-user"
          sx={{ margin: "0.5em 0 0.8em" }}
        >
          Book now
        </Button>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Typography color="text.secondary">
          Book your slot at checkout.
        </Typography>
      </Box>
    </Box>
  );
};

export default CartPage;
