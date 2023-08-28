import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

const NavbarMenuDropdown = ({ toggleDropdown, navbarPages }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{ width: "auto" }}
      role="presentation"
      onClick={toggleDropdown("menu", false)}
    >
      {navbarPages.map((page) => (
        <MenuItem key={page.name} onClick={() => navigate(page.link)}>
          {page.name}
        </MenuItem>
      ))}
    </Box>
  );
};

export default NavbarMenuDropdown;
