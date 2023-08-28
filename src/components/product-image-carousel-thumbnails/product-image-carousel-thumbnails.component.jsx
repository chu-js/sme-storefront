import { useRef } from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const ProductImageCarouselThumbnails = ({ images, setActiveIndex }) => {
  const scrollRef = useRef();

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
  };

  const handleScrollLeft = () => {
    scrollRef.current.scrollLeft -= 200;
  };

  const handleScrollRight = () => {
    scrollRef.current.scrollLeft += 200;
  };

  return (
    <Box display="flex" alignItems="center" mt={2}>
      <IconButton onClick={handleScrollLeft}>
        <ChevronLeftIcon />
      </IconButton>
      <Box
        className="scrollingBox"
        ref={scrollRef}
        display="flex"
        flexDirection="row"
        p={1}
        sx={{
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
          overflowX: "auto",
        }}
      >
        {images &&
          images.map((image, index) => (
            <Box
              key={index}
              onClick={() => handleThumbnailClick(index)}
              sx={{
                margin: "0 5px",
                cursor: "pointer",
              }}
            >
              <img
                src={image.imageUrl}
                alt={image.title}
                style={{
                  width: 80,
                  height: 80,
                  objectFit: "cover",
                  overflow: "hidden",
                }}
              />
            </Box>
          ))}
      </Box>
      <IconButton onClick={handleScrollRight}>
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
};

export default ProductImageCarouselThumbnails;
