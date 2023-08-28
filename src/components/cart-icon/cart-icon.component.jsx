// Cart icon within navbar.
// Reference for hover behaviour of cart icon:
// https://codesandbox.io/s/material-demo-79he1?file=/demo.js
// https://stackoverflow.com/questions/54705254/how-to-keep-showing-the-popover-on-hovering-on-the-anchorel-and-popover-as-w

// This component is not used since we are not using the hover behaviour for cart icon.

import { Fragment } from "react";

import { useSelector } from "react-redux";

import { selectCartCount } from "../../store/cart/cart.selector";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Box, Link, Badge } from "@mui/material";

const CartIcon = ({ onMouseEnter, onMouseLeave }) => {
  const cartCount = useSelector(selectCartCount);

  return (
    <Fragment>
      <Box sx={{ flexGrow: 0 }}>
        {/* Cart icon with badge indicating number of items in cart. */}
        <Badge badgeContent={cartCount} showZero color="primary">
          {/* <Link href="/checkout"> */}
            <ShoppingBagOutlinedIcon
              aria-owns="mouse-over-popover"
              aria-haspopup="true"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              sx={{ color: "white" }}
            />
          {/* </Link> */}
        </Badge>
      </Box>
    </Fragment>
  );
};

export default CartIcon;
