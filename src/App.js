import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import NavigationBar from "./routes/navigation-bar/navigation-bar.component";
import Home from "./routes/home/home.component";
import SignIn from "./routes/sign-in/sign-in.component";
import SignUp from "./routes/sign-up/sign-up.component";
import UserProfile from "./routes/user-profile/user-profile.component";
import Shop from "./routes/shop/shop.component";
import SingleProductPage from "./routes/single-product-page/single-product-page.component";
import CartPage from "./routes/cart-page/cart-page.component";
import CheckoutUser from "./routes/checkout-user/checkout-user.component";
import Checkout from "./routes/checkout/checkout.component";
import OtherAreas from "./routes/other-areas/other-areas.component";
import ContactUs from "./routes/contact-us/contact-us.component";
import WhatsappButton from "./routes/whatsapp-button/whatsapp-button.component";

import { checkUserSession } from "./store/user/user.action";

const App = () => {
  // Run on initialisation of user object
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <>
      <WhatsappButton />
      <Routes>
        <Route path="/" element={<NavigationBar />}>
          <Route index element={<Home />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:tag" element={<SingleProductPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout-user" element={<CheckoutUser />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="other-areas" element={<OtherAreas />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="*" element={<Navigate to="/" />} />{" "}
          {/* Catch-all route */}
        </Route>
      </Routes>
    </>
  );
};

export default App;
