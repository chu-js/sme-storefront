import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { format } from "date-fns";

import { selectCartItems } from "../../store/cart/cart.selector";
import {
  fetchAvailableSlotsStart,
  updateCartItemTimeslotinCart,
  clearItemFromCart,
} from "../../store/cart/cart.action";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";

const CartItem = ({ cartItem, allowDelete, allowSelectSlots }) => {
  const {
    product_name,
    imageUrl,
    selectedOptions,
    totalPrice,
    totalPriceBeforeFwDiscount,
    price,
    total_days,
    availableSlots,
    selectedTimeslot,
  } = cartItem;

  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);

  const [selectedSlot, setSelectedSlot] = useState(selectedTimeslot);

  useEffect(() => {
    // Whenever cartItem updates, update the local selectedSlot state
    setSelectedSlot(cartItem.selectedTimeslot);
  }, [cartItem]);

  useEffect(() => {
    allowSelectSlots && dispatch(fetchAvailableSlotsStart());
  }, []);

  const handleSlotChange = (e) => {
    const newSlot = JSON.parse(e.target.value);
    setSelectedSlot(newSlot);
    dispatch(updateCartItemTimeslotinCart(cartItems, cartItem, newSlot));
  };

  const formatDateTime = (isoDateTimeString) => {
    const dateTime = new Date(isoDateTimeString);
    const formattedDateTime = format(dateTime, "dd MMM yyyy, h:mma");
    return formattedDateTime;
  };

  const clearItemHandler = () =>
    dispatch(clearItemFromCart(cartItems, cartItem));

  return (
    <Box sx={{ margin: "4% 0" }}>
      <Grid container spacing={2} alignItems="center">
        {/* Image */}
        <Grid item xs={3}>
          <Box
            sx={{ width: "100%", paddingBottom: "100%", position: "relative" }}
          >
            <img
              src={imageUrl}
              alt={`${product_name}`}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        </Grid>
        {/* Cart item details */}
        <Grid item xs={8}>
          <Typography variant="h6" sx={{ marginBottom: "2px" }}>
            {product_name} (${price})
          </Typography>

          {Object.values(selectedOptions).map((selectedOption) => {
            return (
              Object.keys(selectedOption).length !== 0 &&
              (selectedOption.additional_price === 0 ? (
                <Typography key={selectedOption.option_id}>
                  <Typography component="span" sx={{ fontWeight: "bold" }}>
                    {selectedOption.add_on_title}:
                  </Typography>{" "}
                  {selectedOption.option}
                </Typography>
              ) : (
                <Typography key={selectedOption.option_id}>
                  <Typography component="span" sx={{ fontWeight: "bold" }}>
                    {selectedOption.add_on_title}:
                  </Typography>{" "}
                  {selectedOption.option} ($
                  {selectedOption.additional_price})
                </Typography>
              ))
            );
          })}

          {totalPrice !== totalPriceBeforeFwDiscount ? (
            <>
              <Typography color="text.secondary" sx={{ marginTop: "4px" }}>
                ${totalPrice}
              </Typography>
              <Typography
                sx={{ textDecoration: "line-through" }}
                color="text.secondary"
              >
                ${totalPriceBeforeFwDiscount}
              </Typography>
            </>
          ) : (
            <Typography color="text.secondary" sx={{ marginTop: "4px" }}>
              ${totalPrice}
            </Typography>
          )}
          <Typography color="text.secondary" sx={{ margin: "2px 0 7px" }}>
            {total_days} days
          </Typography>

          {/* Display for loading available slots for each product */}
          {(!availableSlots || availableSlots.length == 0) &&
            allowSelectSlots && (
              <Typography>Loading available slots...</Typography>
            )}
          {/* Select slot for each product */}
          {availableSlots && availableSlots.length > 0 && allowSelectSlots && (
            <FormControl fullWidth required>
              <InputLabel id="select-slot">Select slot</InputLabel>
              <Select
                labelId="select-slot-label"
                id="select-slot"
                value={selectedSlot ? JSON.stringify(selectedSlot) : ""}
                onChange={handleSlotChange}
              >
                {availableSlots.map((availableSlot) => (
                  <MenuItem
                    key={JSON.stringify(availableSlot)}
                    value={JSON.stringify(availableSlot)}
                    sx={{ whiteSpace: "normal" }}
                  >
                    {formatDateTime(availableSlot.start) +
                      " - " +
                      formatDateTime(availableSlot.end)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Grid>

        {/* x */}
        {allowDelete && (
          <Grid item xs={1}>
            <IconButton onClick={clearItemHandler}>
              <Close />
            </IconButton>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default CartItem;
