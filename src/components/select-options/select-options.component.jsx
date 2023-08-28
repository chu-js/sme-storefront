import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addItemToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import { selectContentAndOptions } from "../../store/products/products.selector";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const SelectOptions = ({ contents, product }) => {
  const dispatch = useDispatch();

  // CartReducer
  const cartItems = useSelector(selectCartItems);
  const contentAndOptions = useSelector(selectContentAndOptions);

  const initialOptions = {
    c42: {},
    c02: {},
    c05: {},
    c06: {},
    c07: {},
    c51: {},
    c52: {},
    c53: {},
    c54: {},
    c55: {},
  };

  const [selectedOptions, setOptions] = useState(initialOptions);

  const onChange = (event) => {
    const { name, value } = event.target;

    const selectedContent = contents.find(
      (content) =>
        content.options &&
        content.options.find((option) => option.option_id === value)
    );
    const contentName = { add_on_title: selectedContent.add_on_title };
    const selectedOption = selectedContent.options.find(
      (option) => option.option_id === value
    );

    const finalSelectedOption = Object.assign({}, contentName, selectedOption);

    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: finalSelectedOption,
    }));
  };

  const addProductToCart = async (e) => {
    e.preventDefault();

    // Extract prices and day of product without add-ons

    let totalPrice =
      product.fw_discounted_price !== ""
        ? product.fw_discounted_price
        : product.price;

    let totalPriceBeforeFwDiscount = product.price;

    let days = product.days;

    // Loop through each selected option and add additional prices and day to the base prices and day extracted above
    for (let contentId in selectedOptions) {
      let optionId = selectedOptions[contentId].option_id;

      if (!optionId) {
        continue;
      }

      const content = contentAndOptions.find(
        (item) => item.content_id === contentId
      );

      const selectedOption = content.options.find(
        (option) => option.option_id === optionId
      );

      let additional_price = selectedOption.additional_price;
      totalPrice += additional_price;
      totalPriceBeforeFwDiscount += additional_price;

      let additional_days = selectedOption.additional_days;
      days += additional_days;
    }

    // Set total prices and days, and add cartItem to Redux store
    product["totalPrice"] = totalPrice;
    product["totalPriceBeforeFwDiscount"] = totalPriceBeforeFwDiscount;
    product["total_days"] = days;

    dispatch(addItemToCart(cartItems, product, selectedOptions));
  };

  return (
    <form onSubmit={addProductToCart}>
      {contents
        .filter((content) => content.has_options)
        .map((content) => (
          <Box
            key={content.content_id}
            sx={{ minWidth: 120, marginBottom: "0.5em" }}
          >
            <FormControl fullWidth required>
              <InputLabel id={content.tag}>{content.add_on_title}</InputLabel>
              <Select
                labelId={content.tag + "-label"}
                id={content.tag}
                name={content.content_id}
                value={selectedOptions[content.content_id].option_id || ""}
                label={content.slogan}
                onChange={onChange}
              >
                {content.options.map((option) => (
                  <MenuItem
                    key={option.option_id}
                    value={option.option_id}
                    sx={{ whiteSpace: "normal" }}
                  >
                    {option.additional_price == 0
                      ? option.option.toString()
                      : option.option.toString() +
                        " (+$" +
                        option.additional_price +
                        ")"}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        ))}
      <Button variant="contained" type="submit" sx={{ margin: "0.5em 0 0.8em" }}>
        Add to cart
      </Button>
      <Typography color="text.secondary">
        Book your slot at checkout.
      </Typography>
    </form>
  );
};

export default SelectOptions;
