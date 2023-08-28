// User profile page: to view and reschedule bookings

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectCurrentUser } from "../../store/user/user.selector";

import { signOutStart } from "../../store/user/user.action";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Loading from "../../components/loading/loading.component";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(selectCurrentUser);

  const signOutUser = () => {
    dispatch(signOutStart());
    navigate("/");
  };

  return (
    <>
      {!currentUser ? (
        <Loading />
      ) : (
        <Box
          sx={{
            p: 3,
          }}
        >
          <Typography variant="h4" marginBottom="10px">
            Your Details
          </Typography>
          <Typography marginBottom="5px">
            Name: {currentUser.firstName} {currentUser.lastName}
          </Typography>
          <Typography marginBottom="5px">Email: {currentUser.email}</Typography>
          <Typography marginBottom="5px">
            Phone number: {currentUser.phoneNumber}
          </Typography>
          <Typography marginBottom="5px">
            Address: {currentUser.address} {currentUser.unitNumber},{" "}
            {currentUser.country} {currentUser.postalCode}
          </Typography>
          <Button
            variant="contained"
            onClick={signOutUser}
            sx={{ margin: "0.8em 0" }}
          >
            Sign out
          </Button>
        </Box>
      )}
    </>
  );
};

export default UserProfile;
