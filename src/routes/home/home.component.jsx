// Home page: porousway.com
// All banner components displayed on the homepage.

import { useState } from "react";

import Box from "@mui/material/Box";
import ComparisonChart from "../../components/comparison-chart/comparison-chart.component";
import ConditionalBanners from "../../components/conditional-banners/conditional-banners.component";
import SelectReasonBanner from "../../components/select-reason-banner/select-reason-banner.component";

const Home = () => {
  // The reason controls the banners that are displayed to users.
  // Set default reason as "beautify".
  const [reason, setReason] = useState("Beautify");
  const handleChange = (event) => {
    setReason(event.target.value);
  };

  return (
    <Box>
      {/* User selects the reason from the SelectReasonBanner. */}
      <SelectReasonBanner reason={reason} handleChange={handleChange} />
      {/* Based on the reason selected, banners are display in the ConditionalBanners component. */}
      <ConditionalBanners reason={reason} />
      {/* Comparison chart of products. This is static. */}
      <ComparisonChart />
    </Box>
  );
};

export default Home;
