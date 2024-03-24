import { Button, Grid } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import AuthModal from "./AuthModal";
import { useNavigate } from "react-router-dom";
import { getUserProfile, loginWithGoogleAction } from "../../Store/Auth/Action";
import { useDispatch } from "react-redux";

const Authentication = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const dispatch = useDispatch();
  // const handleOpenAuthModal = () => {
  //   setOpenAuthModal(true);
  // };
  const handleCloseAuthModal = () => {
    setOpenAuthModal(false);
    navigate("/");
  };
  const handleOpenAuthModal = (route) => {
    if (route === "signin") {
      navigate("/signin");
    } else if (route === "signup") {
      navigate("/signup");
    }
    setOpenAuthModal(true);
  };
  const loginWithGoole = (res) => {
    console.log("res -------------------: ", res);
    dispatch(loginWithGoogleAction(res)).then = () => {
      dispatch(getUserProfile(localStorage.getItem("jwt")));
    };
    // return
  };

  // const handleCloseAuthModal = () => setOpenAuthModal(false);
  const navigate = useNavigate();
  return (
    <div>
      <Grid className="overflow-y-hidden" container>
        <Grid className="hidden lg:block" item lg={7}>
          <img
            className="w-full h-screen"
            src="https://drive.google.com/uc?id=1rNIuVRRjwEWpu-9MYP0dyCOyrVCoPZjO"
            alt=""
          />
        </Grid>
        <Grid className="px-10" lg={5} xs={12}>
          <h1 className="font-bold text-7xl pt-24">Happening now</h1>
          <h1 className="font-bold text-3xl pt-16 pb-8">Join today.</h1>
          <div className="w-[60%]">
            <div className="w-full">
              <div className="space-y-3">
                <GoogleLogin
                  width={340}
                  shape="pill"
                  size="large"
                  logo_alignment="center"
                  text="signup_with"
                  onSuccess={loginWithGoole}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </div>
              <div class="flex items-center w-[100%]">
                <hr class="flex-grow border-gray-400" />
                <p className="py-5 text-center px-4">OR</p>
                <hr class="flex-grow border-gray-400" />
              </div>

              <Button
                onClick={() => handleOpenAuthModal("signup")}
                fullWidth
                variant="contained"
                size="medium"
                sx={{
                  borderRadius: "29px",
                  py: "10px",
                }}
              >
                Create Account
              </Button>
              <p className="text-sm mt-2 text-gray-600">
                By signing up, you agree to the Terms of Service and Privacy
                Policy, including Cookie Use.
              </p>
            </div>
            <div>
              <h1 className="font-bold text-xl mb-5 mt-10">
                Already have account?
              </h1>
              <Button
                onClick={() => handleOpenAuthModal("signin")}
                fullWidth
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: "29px",
                  py: " 10px",
                }}
              >
                Sign in
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
      <AuthModal open={openAuthModal} handleClose={handleCloseAuthModal} />
    </div>
  );
};

export default Authentication;
