import { useSelector } from "react-redux";

import {
  selectCartTotal,
  selectCartTotalBeforeTwoToiletDiscount,
  selectTotalDiscountForTwoToilets,
} from "../../store/cart/cart.selector";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const CartTotal = ({ savingsText }) => {
  const cartTotalBeforeTwoToiletDiscount = useSelector(
    selectCartTotalBeforeTwoToiletDiscount
  );
  const cartTotal = useSelector(selectCartTotal);
  const totalDiscountForTwoToilets = useSelector(
    selectTotalDiscountForTwoToilets
  );

  return (
    <>
      {cartTotal !== cartTotalBeforeTwoToiletDiscount ? (
        <Box
          sx={{
            flexDirection: "column",
          }}
        >
          <Typography color="text.secondary" sx={{ textAlign: "right" }}>
            Order Total:{" "}
            <span style={{ textDecoration: "line-through" }}>
              {" "}
              ${cartTotalBeforeTwoToiletDiscount}
            </span>
          </Typography>
          <Typography sx={{ textAlign: "right" }}>
            {savingsText}: -${totalDiscountForTwoToilets}
          </Typography>
          <Typography color="text.secondary" sx={{ textAlign: "right" }}>
            Total Payment: ${cartTotal}
          </Typography>
        </Box>
      ) : (
        <Typography color="text.secondary" sx={{ textAlign: "right" }}>
          Total Payment: ${cartTotal}
        </Typography>
      )}
    </>
  );
};

export default CartTotal;
