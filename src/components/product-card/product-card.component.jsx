// Product card within shop page.
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import ProductPrice from "../product-price/product-price.component";

const ProductCard = ({ product }) => {
  const { product_name, imageUrl, days, tag } = product;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${tag}`);
  };

  return (
    <Card
      sx={{
        flex: "1 0",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        alt={`${product_name}`}
        height="250"
        image={imageUrl}
      />
      <Box sx={{ flexGrow: 1 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product_name}
          </Typography>
          <ProductPrice product={product} />
          <Typography variant="body1" color="text.secondary">
            {days} days, excl. add-ons
          </Typography>
        </CardContent>
      </Box>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button variant="contained">Buy</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
