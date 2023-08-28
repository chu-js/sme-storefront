import React, { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchProductsStart } from "../../store/products/products.action";
import {
  selectProductByTag,
  selectContentByProductId,
  selectProductsIsLoading,
  selectImagesByProductId,
} from "../../store/products/products.selector";

import { trackEvent } from "../../utils/firebase/firebase.utils";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import SelectOptions from "../../components/select-options/select-options.component";
import ProductImageCarousel from "../../components/product-image-carousel/product-image-carousel.component";
import ProductPrice from "../../components/product-price/product-price.component";
import Loading from "../../components/loading/loading.component";

const SingleProductPage = () => {
  // ProductReducer
  const { tag } = useParams();

  // Start of temporary code to be removed after one month. To redirect users to the correct page after migration of slugs.
  // Also to remove use Navigate.
  const navigate = useNavigate();

  useEffect(() => {
    if ((tag === "p25") | (tag === "p26") | (tag === "p27")) {
      navigate("/product/pebble-floor-whole-toilet");
    }
    if ((tag === "p13") | (tag === "p14") | (tag === "p15")) {
      navigate("/product/lastic-floor-whole-toilet");
    }
    if (tag === "p19") {
      navigate("/product/pebble-floor-flake-wall-full");
    }
  }, [tag, navigate]);

  // End of temporary code.

  const dispatch = useDispatch();

  const product = useSelector((state) => selectProductByTag(state, tag));

  const productId = product?.product_id;

  const contents = useSelector((state) =>
    selectContentByProductId(state, productId)
  );

  const images = useSelector((state) =>
    selectImagesByProductId(state, productId)
  );

  const isLoading = useSelector(selectProductsIsLoading);

  const descriptionRef = useRef(null); // Create a ref for the description section

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);

  const scrollToDescription = () => {
    // Scroll to the description section when the button is clicked
    descriptionRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    // Track the custom event when link is clicked
    trackEvent("click_" + tag + "_more_info_link_on_spp");
  };

  return (
    <div>
      {isLoading || !product || !contents || !images ? (
        <Loading />
      ) : (
        <>
          {/* Display image and product info */}
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {/* Left Grid showing product photos */}
              <Grid item xs={12} sm={12} md={7}>
                <Box sx={{ padding: { sm: "0", md: "2em" } }}>
                  <ProductImageCarousel images={images} />
                </Box>
              </Grid>
              {/* Right Grid showing product details and options  */}
              <Grid item xs={12} sm={12} md={4}>
                <Box sx={{ padding: "2em" }}>
                  <Typography variant="h3" sx={{ marginBottom: "0.3em" }}>
                    {product.product_name}
                  </Typography>
                  <ProductPrice product={product} />
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ marginBottom: "0.5em" }}
                  >
                    Requires {product.days} days, excl. add-ons
                  </Typography>
                  <Typography
                    variant="body2"
                    color="primary" // Set the appropriate color
                    sx={{ cursor: "pointer", marginBottom: "0.5em" }}
                    onClick={scrollToDescription} // Call scrollToDescription function
                  >
                    More information below.
                  </Typography>
                  {/* Select options */}
                  <SelectOptions
                    contents={contents}
                    productId={productId}
                    product={product}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Box ref={descriptionRef} sx={{ padding: "2em" }}>
            <Typography variant="h3">Product Description</Typography>
            {contents
              .filter((content) => content.slogan !== "")
              .map((content) => {
                return (
                  <Box key={content.content_id}>
                    <Typography
                      variant="h4"
                      sx={{ paddingTop: "1em", paddingBottom: "0.5em" }}
                    >
                      {content.slogan}
                    </Typography>
                    <Typography sx={{ textAlign: "justify" }}>
                      {content.long_form}
                    </Typography>
                  </Box>
                );
              })}
          </Box>
        </>
      )}
    </div>
  );
};

export default SingleProductPage;
