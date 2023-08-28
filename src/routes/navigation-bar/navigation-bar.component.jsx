// Navbar: https://mui.com/material-ui/react-app-bar/#ResponsiveAppBar.js
// Drawer for navbar: https://mui.com/material-ui/react-drawer/#TemporaryDrawer.js
// Clipped Drawer for navbar: https://mui.com/material-ui/react-drawer/#ResponsiveDrawer.js
// Clean up: cart icon

import { useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectCurrentUser } from "../../store/user/user.selector";
import { selectCartCount } from "../../store/cart/cart.selector";

import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Link from "@mui/material/Link";
import Popover from "@mui/material/Popover";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import Drawer from "@mui/material/Drawer";
import Badge from "@mui/material/Badge";

// import CartIcon from "../../components/cart-icon/cart-icon.component";
import NavbarMenuDropdown from "../../components/navbar-menu-dropdown/navbar-menu-dropdown.components";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

const navbarPages = [
  { name: "Toilet", link: "/shop" },
  { name: "Other areas", link: "/other-areas" },
  { name: "Contact us", link: "/contact" },
];

const NavigationBar = () => {
  const currentUser = useSelector(selectCurrentUser);
  const cartCount = useSelector(selectCartCount);

  // Ensure responsive navbar
  // Control whether menu - small screen - and cart - medium and small screen - dropdown appear
  const [anchorElNav, setAnchorElNav] = useState({
    menu: false,
    cart: false,
  });

  const toggleDropdown = (anchor, open) => (event) => {
    switch (anchor) {
      case "menu":
        setAnchorElNav({ menu: open, cart: false });
        break;
      case "cart":
        setAnchorElNav({ cart: open, menu: false });
        break;
    }
  };

  // Anchor cart dropdown Popover to the bottom of navbar - medium screen
  const cartPopoverAnchor = useRef(null);

  return (
    <Box>
      <CssBaseline />
      <AppBar
        position="sticky"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        ref={cartPopoverAnchor}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Medium screen */}
            {/* Brand logo - medium screen */}
            <Link
              href="/"
              underline="none"
              sx={{
                height: 40,
                mr: 2,
                display: { xs: "none", sm: "none", md: "flex" },
              }}
            >
              <img
                className="nav-logo"
                src="https://storage.googleapis.com/porousway-website.appspot.com/content/c58.png"
                alt="Porousway Logo"
              />
            </Link>

            {/* Menu - medium screen */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "none", md: "flex" },
              }}
            >
              {navbarPages.map((page) => (
                <Button
                  key={page.name}
                  sx={{ my: 2, color: "white", display: "block" }}
                  href={page.link}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            {/* Small screen */}
            {/* Menu - small screen */}
            <Box
              sx={{
                display: { xs: "flex", sm: "flex", md: "none" },
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              {/* Hamburger icon */}
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleDropdown("menu", !anchorElNav.menu)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>

              {/* Brand logo - small screen */}
              <Link href="/" underline="none">
                <img
                  className="nav-logo"
                  src="https://storage.googleapis.com/porousway-website.appspot.com/content/c58.png"
                  alt="Porousway Logo"
                  style={{ height: "40px", objectFit: "contain" }}
                />
              </Link>

              {/* Empty Box to balance space-between property */}
              <Box />
            </Box>

            <Box sx={{ display: "flex", flexGrow: 0 }}>
              {/* User icon */}
              {/* Sign in or sign up */}
              {/* Clean up: Redirect signed-in user to profile page with bookings and sign-out button at the bottom */}
              {currentUser ? (
                <Tooltip title="Logout">
                  <Link href="/profile">
                    <PersonOutlineIcon sx={{ color: "white" }} />
                  </Link>
                </Tooltip>
              ) : (
                <Tooltip title="Login">
                  <Link href="/signin">
                    <PersonOutlineIcon sx={{ color: "white" }} />
                  </Link>
                </Tooltip>
              )}

              {/* Shopping cart icon */}
              {/* Cart icon with badge indicating number of items in cart. */}
              <Badge badgeContent={cartCount} showZero color="primary">
                <ShoppingBagOutlinedIcon
                  // aria-owns="mouse-over-popover"
                  aria-haspopup="true"
                  sx={{ color: "white", cursor: "pointer" }}
                  onClick={toggleDropdown("cart", !anchorElNav.cart)}
                />
              </Badge>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Menu Drawer - small screen */}
      <Drawer
        open={anchorElNav["menu"]}
        onClose={toggleDropdown("menu", false)}
        anchor="top"
        sx={{
          width: "auto",
        }}
      >
        <Toolbar />
        <NavbarMenuDropdown
          toggleDropdown={toggleDropdown}
          navbarPages={navbarPages}
        />
      </Drawer>

      {/* Cart Drawer - small screen */}
      <Drawer
        open={anchorElNav["cart"]}
        onClose={toggleDropdown("cart", false)}
        anchor="top"
        sx={{
          width: "auto",
          display: { xs: "flex", sm: "flex", md: "none" },
        }}
      >
        <Toolbar />
        <CartDropdown />
      </Drawer>

      {/* Cart Popover - medium screen */}
      <Popover
        open={anchorElNav["cart"]}
        onClose={toggleDropdown("cart", false)}
        anchorEl={cartPopoverAnchor.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          display: { xs: "none", sm: "none", md: "flex" },
          mt: 1,
          height: "70vh",
        }}
      >
        <CartDropdown />
      </Popover>
      <Outlet />
    </Box>
  );
};

export default NavigationBar;
