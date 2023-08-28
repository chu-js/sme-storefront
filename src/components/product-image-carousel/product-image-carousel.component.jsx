import { useState } from "react";

import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import ProductImageCarouselThumbnails from "../product-image-carousel-thumbnails/product-image-carousel-thumbnails.component";

const ProductImageCarousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((oldIndex) => {
      return oldIndex === 0 ? images.length - 1 : oldIndex - 1;
    });
  };

  const handleNext = () => {
    setActiveIndex((oldIndex) => {
      return oldIndex === images.length - 1 ? 0 : oldIndex + 1;
    });
  };

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center">
        {images && images.length > 0 && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ padding: "1em 0" }}
          >
            <IconButton onClick={handlePrev}>
              <ChevronLeftIcon />
            </IconButton>
            <Box
              className="img-container"
              sx={{
                width: ["80vw", "60vw", "40vw"], // Responsive width
                height: ["80vw", "60vw", "40vw"], // Responsive height, keep it the same as width to maintain a square aspect ratio
                overflow: "hidden",
                position: "relative",
              }}
            >
              <img
                src={images[activeIndex].imageUrl}
                alt="carousel"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
              <Typography
                sx={{
                  position: "absolute", // Absolute positioning
                  bottom: 0, // Stick to bottom
                  backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
                  color: "#fff", // White text
                  width: "100%", // Cover full width of parent
                  p: 1, // Some padding
                }}
              >
                {images[activeIndex].addOnTitle ? (
                  <>
                    <Typography component="span" sx={{ fontWeight: "bold" }}>
                      {`${images[activeIndex].addOnTitle}:`}
                    </Typography>
                    <Typography component="span">
                      {` ${images[activeIndex].title}`}
                    </Typography>
                  </>
                ) : (
                  images[activeIndex].title
                )}
              </Typography>
            </Box>
            <IconButton onClick={handleNext}>
              <ChevronRightIcon />
            </IconButton>
          </Box>
        )}
        <Box sx={{ maxWidth: "100%", overflow: "hidden", padding: "0 2%" }}>
          <ProductImageCarouselThumbnails
            images={images}
            setActiveIndex={setActiveIndex}
          />
        </Box>
      </Box>
    </>
  );
};

export default ProductImageCarousel;
