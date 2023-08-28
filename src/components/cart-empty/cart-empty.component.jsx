import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const CartEmpty = () => (
  <Typography>
    Your cart is empty. Find inspirations for beautifying your home{" "}
    <Link href="shop">here</Link>.
  </Typography>
);

export default CartEmpty;
