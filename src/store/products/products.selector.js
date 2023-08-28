import { createSelector } from "reselect";

// Extract products slice of reducer from root reducer.
const selectProductsReducer = (state) => state.products;

// Create memoized selector for products object.
export const selectProducts = createSelector(
  // The input is the reducer slice, products, from rootReducer.
  // This should not change unless data from Firestore API changes.
  [selectProductsReducer],

  // Check if object within reducer slice is different. If so, re-render. If not, don't re-render.
  (productsSlice) => {
    // Sort: floor > floor + wall > wall
    const sortedProducts = productsSlice.products.sort((a, b) => {
      let aValue = a.c48_floor ? 3 : a.c50_floor_wall ? 2 : 1;
      let bValue = b.c48_floor ? 3 : b.c50_floor_wall ? 2 : 1;

      // Consider priority_product for sorting, with priority_product products appearing on top
      // Add a higher value for priority products
      aValue += a.priority_product;
      bValue += b.priority_product;

      return bValue - aValue;
    });

    return sortedProducts;
  }
);

export const selectMap = createSelector(
  [selectProductsReducer],
  (productsSlice) => productsSlice.mapProductsContent
);

export const selectContentAndOptions = createSelector(
  [selectProductsReducer],
  (productsSlice) => productsSlice.contentAndOptions
);

// Select isLoading value
export const selectProductsIsLoading = createSelector(
  [selectProductsReducer],
  (productsSlice) => productsSlice.isLoading
);

// GET CONTENT BY PRODUCT ID
// Input selector
const getProductId = (state, productId) => productId;

// Intermediate selector to find the contentId mapped to a productId
const selectContentIdArrayByProductId = createSelector(
  [selectMap, getProductId],
  (map, productId) => {
    const productMap = map.filter((item) => item.product_id === productId);
    return productMap;
  }
);

// Main memoized selector
export const selectContentByProductId = createSelector(
  [selectContentAndOptions, selectContentIdArrayByProductId],
  (contentAndOptions, contentIdArray) => {
    const contentArray = [];
    for (let i = 0; i < contentIdArray.length; i++) {
      const contentItem = contentAndOptions.filter(
        (item) => item.content_id === contentIdArray[i].content_id
      );
      contentArray.push(contentItem[0]);
    }
    contentArray.sort((a, b) => a.sequence - b.sequence);

    return contentArray;
  }
);

// Here, I violate the best practice of using productId to select for product and use tag instead.
// However, this is necessary to implement the SEO-friendly slug using the product name itself.

// Input selector: tag
const getTag = (state, tag) => tag;

// GET PRODUCT BY TAG
export const selectProductByTag = createSelector(
  [selectProducts, getTag],
  (products, tag) => {
    const product = products.find((item) => item.tag === tag);
    return product;
  }
);

// GET PRODUCT BY PRODUCT ID
export const selectProductByProductId = createSelector(
  [selectProducts, getProductId],
  (products, productId) => {
    const product = products.find((item) => item.product_id === productId);
    return product;
  }
);

// GET IMAGE ARRAY OF PRODUCT AND ITS OPTIONS BY PRODUCT ID
export const selectImagesByProductId = createSelector(
  [selectProductByProductId, selectContentByProductId],
  (product, content) => {
    let imageArray = [];

    if (product && product.imageUrl) {
      imageArray.push({
        title: product.product_name,
        imageUrl: product.imageUrl,
      });
    }

    if (content && Array.isArray(content)) {
      content.forEach((contentItem) => {
        if (contentItem.options.length > 0) {
          contentItem.options.forEach((option) => {
            if (option.imageUrl !== "") {
              imageArray.push({
                addOnTitle: contentItem.add_on_title,
                title: option.option,
                imageUrl: option.imageUrl,
              });
            }
          });
        }
      });
    }
    return imageArray;
  }
);
