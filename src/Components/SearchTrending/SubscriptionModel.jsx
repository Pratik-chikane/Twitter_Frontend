import {
  Avatar,
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

import { useDispatch, useSelector } from "react-redux";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { createPayment } from "../../Store/Payment/Action";
import { loadStripe } from "@stripe/stripe-js";
import { API_BASE_URL } from "../../Config/Api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: 3,
  outline: "none",
  overflow: "scroll-y",
};

const SubscriptionModel = ({ handleClose, open }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const [plan, setPlan] = useState("yearly");

  useEffect(() => {}, [auth.user]);
  const makePayment = async () => {
    console.log("plan ", plan);
    const stripe = await loadStripe(
      "pk_test_51OaEfMSEPNH9uOogcYX28C2OeaEKi1DwihtDEBeVNxdBxaMb1aViDlQCiuwXPjYvJtXP9GGsF2uP2HF72yLPRZvl00mz89X2qo"
    );

    const header = {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    };

   
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/create-checkout-session/${plan}`,
        {
          method: "post",
          headers: header,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch checkout session");
      }

      const responseData = await response.json();
      console.log("sSESSION,", responseData.sessionId);
      const result = await stripe.redirectToCheckout({
        sessionId: responseData.sessionId,
      });

      // Handle the result if needed
      console.log(result);
    } catch (error) {
      console.error("Error making payment:", error);
    }
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
          <div className="flex items-center justify-between s">
            <div className="flex items-center space-x-3">
              <IconButton onClick={handleClose} aria-label="delete">
                <CloseIcon />
              </IconButton>
            </div>
          </div>
          <div className="flex justify-center py-5 ">
            <div className="w-[80%] space-y-10 hideScrollBar overflow-y-scroll  overflow-x-hidden ">
              <div className="py-3 px-8  bg-gray-100 rounded-3xl">
                <h1 className="text-center font-bold pr-5 text-4xl">
                  Premium+
                </h1>
               
              </div>

              <div className="flex justify-between border bg-gray-100 rounded-full px-5 py-3 ">
                <div className="space-x-28">
                  <span
                    className={`${
                      plan === "yearly" ? "text-gray-800" : "text-gray-400"
                    } cursor-pointer font-bold`}
                    onClick={() => setPlan("yearly")}
                  >
                    Yearly
                  </span>
             
                    <span
                      onClick={() => setPlan("monthly")}
                      className="text-green-500  font-bold"
                    >
                      SAVE 20 %
                    </span>
      
                </div>
                <p
                  onClick={() => setPlan("monthly")}
                  className={`${
                    plan === "monthly" ? "text-gray-800" : "text-gray-400"
                  } cursor-pointer font-bold`}
                >
                  Monthly
                </p>
              </div>

              <div className="space-y-3 bg-gray-100 px-8 py-5 rounded-3xl">
                <div className="flex items-center space-x-5">
                  <FiberManualRecordIcon sx={{ width: "7px", height: "7px" }} />
                  <p className=" text-xs">
                    Prioritized rankings.
                  </p>
                </div>
                <div className="flex items-center space-x-5">
                  <FiberManualRecordIcon
                    sx={{
                      width: "7px",
                      height: "7px",
                      padding: "0px",
                      border: "",
                    }}
                  />
                  <p className=" text-xs text-center">
                  Edit post.
                  </p>
                </div>
                <div className="flex items-center space-x-5">
                  <FiberManualRecordIcon sx={{ width: "7px", height: "7px" }} />
                  <p className=" text-xs">
                  Longer posts.
                  </p>
                </div>
                <div className="flex items-center space-x-5">
                  <FiberManualRecordIcon sx={{ width: "7px", height: "7px" }} />
                  <p className=" text-xs">
                  Background video playback
                  </p>
                </div>
                <div className="flex items-center space-x-5">
                  <FiberManualRecordIcon sx={{ width: "7px", height: "7px" }} />
                  <p className=" text-xs">
                    Post longer videos.
                  </p>
                </div>

              </div>

              <div
                onClick={makePayment}
                className=" cursor-pointer flex justify-center bg-gray-100 px-8 py-4 rounded-3xl text-black "
              >
                <span className="line-through italic">
                  {plan === "yearly" ? "$299/year" : "$30/month"}
                </span>
                <span className="px-5 font-medium">
                  {plan === "yearly" ? "$109/year" : "$25/month"}
                </span>
              </div>
            </div>
          </div>

          {/* <BackdropComponent open={uploading} /> */}
        </Box>
      </Modal>
    </div>
  );
};

export default SubscriptionModel;
