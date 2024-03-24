import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";
import { useLocation, useNavigate } from "react-router-dom";
import { blue } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  borderRadius: 4,
  outline: "none",
  boxShadow: 24,
  p: 4,
};

export default function AuthModal({ open, handleClose }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = () => {
    const path = location.pathname === "/signup" ? "/signin" : "/signup";
    navigate(path);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton onClick={handleClose} aria-label="delete">
            <CloseIcon />
          </IconButton>
          {location.pathname === "/signup" ? <SignupForm /> : <SigninForm />}
          <div className="flex items-center flex-col pb-5">
            <div class="flex items-center w-[80%]">
              <hr class="flex-grow border-gray-500" />
              <h1 className="text-center px-4 py-7 font-semibold text-lg text-gray-600">
                {location.pathname === "/signup"
                  ? "Have an account already ! "
                  : "Don't have an account?"}
              </h1>
              <hr class="flex-grow border-gray-500" />
            </div>

            <Button
              variant="outlined"
              size="medium"
              onClick={handleNavigate}
              sx={{
                borderRadius: "29px",
                py: "10px",
                bgColor: blue[500],
                width: "50%",
              }}
            >
              {location.pathname === "/signup" ? "Sign in" : "Sign up"}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
