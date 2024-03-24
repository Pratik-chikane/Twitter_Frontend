import { Alert, Box, Button, IconButton } from "@mui/material";
import React, { useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { store } from "../../Store/Store";
import SubscriptionModel from "./SubscriptionModel";

const Verified = () => {
  const navigate = useNavigate();
  const handleNavigateBack = () => navigate(-1);
  const { auth } = useSelector((store) => store);

  const [openSubscriptionModal, setOpenSubscriptionModal] = useState(false);
  const handleCloseSubscriptionMadal = () => setOpenSubscriptionModal(false);
  const handleOpenSubscriptionModal = () => setOpenSubscriptionModal(true);
  return (
    <div>
      <section
        className={
          "bg-white z-50 flex items-center sticky top-0 bg-opacity-90 px-5"
        }
      >
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleNavigateBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">Subscription</h1>
      </section>
      <hr />
      {auth?.user.verified ? (
        <div className="justify-center space-y-10 p-10 h-[80%] w-[80%] ">
          <div className="flex flex-col items-center justify-center">
            <img
              className="w-16 h-16  "
              src="https://abs.twimg.com/responsive-web/client-web/verification-card-v2@3x.8ebee01a.png"
              alt=""
            />
            <Alert className="my-5 font-bold text-3xl" severity="success">
              Congratulations Your Account Is Verified Till{" "}
              {auth?.user.verifiedTill}
            </Alert>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-5">
              <FiberManualRecordIcon sx={{ width: "7px", height: "7px" }} />
              <p className=" text-xs">
                Prioritized rankings in conversations and search
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
              <p className=" text-xs">
                See approximately twice as many Tweets between ads in your For
                You and Following timelines.
              </p>
            </div>
            <div className="flex items-center space-x-5">
              <FiberManualRecordIcon sx={{ width: "7px", height: "7px" }} />
              <p className=" text-xs">
                Add bold and italic text in your Tweets.
              </p>
            </div>
            <div className="flex items-center space-x-5">
              <FiberManualRecordIcon sx={{ width: "7px", height: "7px" }} />
              <p className=" text-xs">
                Post longer videos and 1080p video uploads.
              </p>
            </div>

            <div className="flex items-center space-x-5">
              <FiberManualRecordIcon sx={{ width: "7px", height: "7px" }} />
              <p className=" text-xs">
                All the existing Blue features, including Edit Tweet, Bookmark
                Folders and early access to new features.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <section className="py-5 my-20 px-4 lg:px-10 lg:mx-10 bg-gray-100 rounded-3xl space-y-4">
          <h1 className="text-2xl font-bold">Subscribe to Premium</h1>
          <h1 className="font-medium my-1">
            Subscribe to unlock new features and if eligible, receive a share of
            ads revenue.
          </h1>
          <Button
            onClick={handleOpenSubscriptionModal}
            variant="contained"
            sx={{ padding: "10px", paddingX: "20px", borderRadius: "25px" }}
          >
            {" "}
            Subscribe
          </Button>
        </section>
      )}
      <SubscriptionModel
        open={openSubscriptionModal}
        handleClose={handleCloseSubscriptionMadal}
      />
    </div>
  );
};

export default Verified;
