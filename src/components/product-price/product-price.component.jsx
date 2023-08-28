import Typography from "@mui/material/Typography";

const ProductPrice = ({ product }) => {
  const { price, fw_discounted_price, c44_fw_discount } = product;

  return (
    <>
      {c44_fw_discount === 1 ? (
        <>
          <Typography variant="body1" color="text.secondary">
            ${fw_discounted_price}
          </Typography>
          <Typography
            variant="body2"
            sx={{ textDecoration: "line-through" }}
            color="text.secondary"
          >
            ${price}
          </Typography>
        </>
      ) : (
        <Typography variant="body1" color="text.secondary">
          ${price}
        </Typography>
      )}
    </>
  );
};

export default ProductPrice;
