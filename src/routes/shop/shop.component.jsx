// Full shop page (preview of all products)
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchProductsStart } from "../../store/products/products.action";
import {
  selectProducts,
  selectProductsIsLoading,
} from "../../store/products/products.selector";

import Product from "../../components/product/product.component";
import ProductFilter from "../../components/product-filter/product-filter.component";
import SelectedFilters from "../../components/selected-filters/selected-filters.component";

import CircularProgress from "@mui/material/CircularProgress";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormGroup from "@mui/material/FormGroup";
import Box from "@mui/material/Box";

const Shop = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const products = useSelector(selectProducts);
  const isLoading = useSelector(selectProductsIsLoading);

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);

  const [drawerOpen, setDrawerOpen] = useState(false);

  // Filter for relevant materials
  const [productFilter, setProductFilter] = useState({
    pebbleFloorFilter: location.state?.pebbleFloorFilter || false,
    pebbleWallFilter: location.state?.pebbleWallFilter || false,
    flakeWallFilter: location.state?.flakeWallFilter || false,
    lasticFloorFilter: location.state?.lasticFloorFilter || false,
    lasticWallFilter: location.state?.lasticWallFilter || false,
  });
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products, productFilter]);

  useEffect(() => {
    const filtered = products.filter((product) => {
      if (productFilter.pebbleFloorFilter && product.c51_pebble_floor == 1) {
        return true;
      }
      if (productFilter.pebbleWallFilter && product.c52_pebble_wall == 1) {
        return true;
      }
      if (productFilter.flakeWallFilter && product.c53_flake_wall == 1) {
        return true;
      }
      if (productFilter.lasticFloorFilter && product.c54_lastic_floor == 1) {
        return true;
      }
      if (productFilter.lasticWallFilter && product.c55_lastic_wall == 1) {
        return true;
      }
      if (
        !productFilter.pebbleFloorFilter &&
        !productFilter.pebbleWallFilter &&
        !productFilter.flakeWallFilter &&
        !productFilter.lasticFloorFilter &&
        !productFilter.lasticWallFilter
      ) {
        return true;
      }
      return false;
    });
    setFilteredProducts(filtered);
  }, [products, productFilter]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  const resetFilters = () => {
    setProductFilter({
      pebbleFloorFilter: false,
      pebbleWallFilter: false,
      flakeWallFilter: false,
      lasticFloorFilter: false,
      lasticWallFilter: false,
    });
  };

  return (
    <div>
      {isLoading ? (
        <CircularProgress
          color="inherit"
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
          }}
        />
      ) : (
        <>
          {/* Product Filter */}
          {/* Small screen */}
          <>
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                justifyContent: "center",
                flexDirection: "row",
                paddingTop: "10px",
              }}
            >
              <Button onClick={handleDrawerToggle}>Filter by Materials</Button>
              <Button onClick={resetFilters}>Reset Filter</Button>
            </Box>
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                justifyContent: "center",
                flexDirection: "row",
                paddingTop: "10px",
              }}
            >
              <SelectedFilters
                productFilter={productFilter}
                setProductFilter={setProductFilter}
              />
            </Box>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={handleDrawerToggle}
              sx={{ flexGrow: 1, display: { sm: "flex", md: "none" } }}
            >
              <List sx={{ paddingTop: "80px", paddingRight: "30px" }}>
                <ListItem>
                  <Typography fontWeight="bold">Filter by Materials</Typography>
                </ListItem>
                {Object.keys(productFilter).map((key) => {
                  const value = productFilter[key];
                  const labelArray = key.split(/(?=[A-Z])/);
                  const label =
                    labelArray[0][0].toUpperCase() +
                    labelArray[0].substring(1) +
                    " " +
                    labelArray.slice(1, 2).join(" ");

                  return (
                    <ListItem key={key}>
                      <ProductFilter
                        filter={value}
                        filterName={key}
                        label={label}
                        setProductFilter={setProductFilter}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Drawer>
          </>

          {/* Medium Screen */}
          {/* Use Grid system to control whether filter is displayed on the left by default */}
          <Grid container spacing={2}>
            <Grid
              item
              md={3}
              lg={2}
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "10%",
                }}
              >
                <Typography fontWeight="bold">Filter by Materials</Typography>
                <FormGroup>
                  {Object.keys(productFilter).map((key) => {
                    const value = productFilter[key];
                    const labelArray = key.split(/(?=[A-Z])/);
                    const label =
                      labelArray[0][0].toUpperCase() +
                      labelArray[0].substring(1) +
                      " " +
                      labelArray.slice(1, 2).join(" ");

                    return (
                      <ProductFilter
                        key={key}
                        filter={value}
                        filterName={key}
                        label={label}
                        setProductFilter={setProductFilter}
                      />
                    );
                  })}
                </FormGroup>

                <Button onClick={resetFilters}>Reset Filter</Button>
              </Box>
            </Grid>

            {/* Product listing */}
            {/* All Screens */}
            <Grid item xs={12} sm={12} md={9} lg={10}>
              <Product products={filteredProducts} />
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};

export default Shop;
