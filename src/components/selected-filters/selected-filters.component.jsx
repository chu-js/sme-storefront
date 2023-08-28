import Chip from "@mui/material/Chip"
import Stack from "@mui/material/Stack"

const SelectedFilters = ({productFilter, setProductFilter}) => {
  const selectedFilters = Object.keys(productFilter).filter(
    (key) => productFilter[key]
  );

  if (selectedFilters.length === 0) {
    return null;
  }

  return (
    <Stack direction="row" spacing={1} marginTop={1}>
      {selectedFilters.map((key) => {
        const labelArray = key.split(/(?=[A-Z])/);
        const label =
          labelArray[0][0].toUpperCase() +
          labelArray[0].substring(1) +
          " " +
          labelArray.slice(1, 2).join(" ");

        return (
          <Chip
            key={key}
            label={label}
            onDelete={() => {
              setProductFilter({ ...productFilter, [key]: false });
            }}
          />
        );
      })}
    </Stack>
  );
};

export default SelectedFilters;
