import React, { useEffect, useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Button } from "@mui/material";
import RepeatIcon from "@mui/icons-material/Repeat";
import PlaceIcon from "@mui/icons-material/Place";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TweetCard from "../HomeSection/TweetCard";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../Store/Store";
import { findUserById, followUnfollowUser } from "../../Store/Auth/Action";
import {
  getAllUsersBookmarkTweets,
  getAllUsersLikedTweets,
  getAllUsersTweets,
  getUsersAllTweets,
} from "../../Store/Tweet/Action";
import { InsertEmoticonOutlined } from "@mui/icons-material";

const Profile = () => {
  const [tabValue, setTabValue] = useState("1");
  const { auth, tweet } = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const handleNavigateBack = () => navigate(-1);
  const fullName = auth?.findUser?.fullName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const handleOpenProfile = () => {
    navigate(`/editprofile`);
  };
  const handleFollowUser = () => {
    dispatch(followUnfollowUser(id));
    console.log("FOLLOW USER");
  };
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    console.log("HANDLE CHANGE");
    if (newValue === 2) console.log("2");
    else if (newValue === 3) console.log("3");
  };

  useEffect(() => {
    dispatch(findUserById(id));
    console.log("BEFORE GET ALL USER TWEET", id);
   dispatch(getUsersAllTweets(id))
    console.log(" ALL USER TWEET", id);
    dispatch(getAllUsersLikedTweets(id));
  }, [id]);
  return (
    <div className="px-0">
      <section
        className={
          "bg-white z-50 flex items-center sticky top-0 bg-opacity-90 px-5"
        }
      >
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleNavigateBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">{fullName}</h1>
      </section>
      <section className="">
        <img
          className="w-[100%] h-[15rem] object-cover bg-gray-100"
          src={auth?.findUser?.backgroundImage}
          alt=""
        />
      </section>
      <section className="pl-5">
        <div className="flex justify-between items-start mt-5 h-[5rem] pr-5">
          <Avatar
            className="transform -translate-y-24"
            alt="USERNAME"
            src={auth?.findUser?.profileImage}
            sx={{ width: "10rem", height: "10rem", border: "4px solid white" }}
          />
          {auth?.findUser?.req_user ? (
            <Button
              onClick={handleOpenProfile}
              sx={{ borderRadius: "20px" }}
              variant="contained"
            >
              Edit Profile
            </Button>
          ) : (
            <Button
              onClick={handleFollowUser}
              sx={{ borderRadius: "20px" }}
              variant="contained"
            >
              {auth?.findUser?.followed ? "Unfollow" : "Follow"}
            </Button>
          )}
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-bold text-lg">{fullName}</h1>
            {auth?.findUser?.verified && (
              <img
                className="ml-2 w-4 h-4"
                src="https://drive.google.com/uc?export=view&id=1EmV6YNlUaWDu-kmmoRc1JN1AJQHPlZEJ"
                alt="" />
            )}
          </div>

          <h1 className="text-gray-500">
            @{auth?.findUser?.fullName.split(" ").join("").toLowerCase()}
          </h1>
        </div>
        <div className="mt-2 space-y-3">
          <p>{auth?.findUser?.bio}</p>
          <div className="py-1 flex space-x-5">
            <div className="flex items-center text-gray-500 ">
              <PlaceIcon />
              <p className="ml-2">{auth?.findUser?.location}</p>
            </div>
            <div className="flex items-center text-gray-500">
              <CalendarMonthIcon />
              <p className="ml-2">Joined {auth?.findUser?.joinedSince}</p>
            </div>
            <p>{auth?.findUser?.website}</p>
          </div>

          <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-1 font-semibold">
              <span>{auth?.findUser?.following?.length}</span>
              <span className="text-gray-500">Following</span>
            </div>
            <div className="flex items-center space-x-1 font-semibold">
              <span>{auth?.findUser?.followers?.length}</span>
              <span className="text-gray-500">Followers</span>
            </div>
          </div>
        </div>
      </section>
      <section className="py-2">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleTabChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Tweets" value="1" />
                <Tab label="Replay" value="2" />
                {/* <Tab label="Media" value="3" /> */}
                <Tab label="Likes" value="3" />
              </TabList>
            </Box>
            <TabPanel sx={{ padding: 1 }} className="m-0" value="1">
              {tweet?.tweets?.map((item) => (
                <>
                  {item?.retweet && (
                    <div className="flex items-center font-medium text-gray-500 pt-2 space-x-1">
                      <RepeatIcon style={{ fontSize: "15px" }} />
                      <p>{fullName} Retweeted</p>
                    </div>
                  )}
                  <TweetCard tweet={item} />
                </>
              ))}
            </TabPanel>
            <TabPanel sx={{ padding: 1 }} value="2">
              {tweet?.tweets?.map((item) => (
                <>
                  {InsertEmoticonOutlined?.retweet && (
                    <div className="flex items-center font-medium text-gray-500 pt-2 space-x-1">
                      <RepeatIcon style={{ fontSize: "15px" }} />
                      <p>You Retweeted</p>
                    </div>
                  )}
                  <TweetCard tweet={item} />
                </>
              ))}
            </TabPanel>
            {/* <TabPanel value="3">Media</TabPanel> */}
            <TabPanel sx={{ padding: 1 }} value="3">
              {tweet?.likedTweets?.map((item) => (
                <TweetCard tweet={item} />
              ))}
            </TabPanel>
          </TabContext>
        </Box>
      </section>
    </div>
  );
};

export default Profile;
