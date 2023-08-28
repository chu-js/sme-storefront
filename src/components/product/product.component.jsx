import ProductCard from "../product-card/product-card.component";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const Product = ({ products }) => (
  <Box sx={{ flexGrow: 1, m: 3 }}>
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid
          key={product.product_id}
          item
          xs={12}
          sm={6}
          md={6}
          lg={4}
          xl={3}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignContent: "stretch",
          }}
        >
          <ProductCard key={product.product_id} product={product} />
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default Product;
