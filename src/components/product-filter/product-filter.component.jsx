import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const ProductFilter = ({ filter, filterName, label, setProductFilter }) => {
  const onCheckedChange = (event) => {
    const { name, checked } = event.target;
    setProductFilter((prevFilter) => ({
      ...prevFilter,
      [name]: checked,
    }));
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={filter}
          name={filterName}
          onChange={onCheckedChange}
        />
      }
      label={label}
    />
  );
};

export default ProductFilter;
