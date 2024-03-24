import React, { useRef, useState } from "react";
import RepeatIcon from "@mui/icons-material/Repeat";
import { useNavigate } from "react-router-dom";
import { Avatar, Fab, IconButton, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Button from "@mui/material/Button";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import BarChartIcon from "@mui/icons-material/BarChart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReplayTweet from "../TweetDetails/ReplayTweet";
import { useDispatch, useSelector } from "react-redux";
import {
  BookmarkUnbookmarkTweet,
  createRetweet,
  deleteTweet,
  likeUnlikeTweet,
} from "../../Store/Tweet/Action";

import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { Height } from "@mui/icons-material";
import { useVideoScrollControl } from "./Util/Scroll";

const TweetCard = ({ tweet }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const [openTweetReplay, setOpenTweetReplay] = useState(false);
  const handleOpenTweetReplay = () => setOpenTweetReplay(true);
  const handleCloseTweetReplay = () => setOpenTweetReplay(false);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeleteTweet = () => {
    console.log("DELTE");
    dispatch(deleteTweet(tweet?.id));
    handleClose();
  };
  const handleCreateBookmark = () => {
    console.log("Like TWEET");
    dispatch(BookmarkUnbookmarkTweet(tweet?.id));
  };

  const handleCreateRetweet = () => {
    dispatch(createRetweet(tweet?.id));
    console.log("CREATE RETWEET");
  };
  const handleLikeRetweet = () => {
    console.log("Like TWEET");
    dispatch(likeUnlikeTweet(tweet?.id));
  };
  const min = 1;
  const max = 600;
  return (
    <div className="pt-4">
      <div className="flex space-x-2 lg:space-x-5">
        <Avatar
          // sx={{ width: 26, height: 26 }}
          onClick={() => navigate(`/profile/${tweet?.user.id}`)}
          className="cursor-pointer"
          alt="USERNAME"
          src={tweet?.user.profileImage}
        />
        <div className="w-full overflow-hidden">
          <div className="flex justify-between items-center">
            <div className="flex cursor-pointer items-center space-x-1 lg:space-x-2">
              <span className="font-semibold">
                {tweet?.user?.fullName
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </span>
            { tweet?.user.verified && <img
                className="ml-2 w-4 h-4"
                src="https://drive.google.com/uc?export=view&id=1EmV6YNlUaWDu-kmmoRc1JN1AJQHPlZEJ"
                alt=""
              />}
              <span className="text-gray-600">
                @{tweet?.user.fullName.split(" ").join("").toLowerCase()} .{" "}
                {tweet?.tweetCreatedAt}
              </span>
            </div>
            <div>
              <IconButton
                size="small"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreHorizIcon />
              </IconButton>
              {tweet?.user.req_user ? (
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleDeleteTweet}>Delete</MenuItem>
                  <MenuItem onClick={handleDeleteTweet}>Edit</MenuItem>
                </Menu>
              ) : null}
            </div>
          </div>
          <div className="mt-1">
            <div
              onClick={() => navigate(`/tweet/${tweet?.id}`)}
              className="cursor-pointer"
            >
              <p className="mb-2 p-0">{tweet?.content}</p>

              {tweet?.image && (
                <img
                  className="w-[28rem] object-cover rounded-lg"
                  src={tweet.image}
                  alt=""
                />
              )}
              {tweet?.video && (
                <div className=" w-full object-cover rounded-lg">
                  <video
                    className="max-h-[40rem] p-5"
                    controls
                    autoPlay
                    loop
                    muted
                    src={tweet.video}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="py-5 flex flex-wrap justify-between items-center pr-5 lg:pr-10">
            <div
              className={`${
                false ? "text-green-600" : "text-gray-600"
              } space-x-2 flex items-center hover:text-green-600`}
            >
              <ChatBubbleOutlineIcon
                className="cursor-pointer"
                onClick={handleOpenTweetReplay}
              />
              <p>{tweet?.totalReplies}</p>
            </div>
            <div
              className={`${
                tweet?.retweet ? "text-blue-500" : "text-gray-600"
              } space-x-2 flex items-center hover:text-blue-500`}
            >
              <RepeatIcon
                className="cursor-pointer"
                onClick={handleCreateRetweet}
              />
              <p>{tweet?.totalRetweets}</p>
            </div>
            <div
              className={`${
                tweet?.liked ? "text-pink-600" : "text-gray-600"
              } space-x-1 flex items-center hover:text-pink-600`}
            >
              {tweet?.liked || tweet?.replayTweets?.like ? (
                <FavoriteIcon
                  className="cursor-pointer"
                  onClick={handleLikeRetweet}
                />
              ) : (
                <FavoriteBorderIcon
                  className="cursor-pointer"
                  onClick={handleLikeRetweet}
                />
              )}
              <p>{tweet?.totalLikes}</p>
            </div>
            <div
              className={`${
                false ? "text-blue-500" : "text-gray-600"
              } space-x-1 flex items-center hover:text-blue-500`}
            >
              <BarChartIcon className="cursor-pointer " />
              <p>{Math.floor(Math.random() * (max - min + 1)) + min}k</p>
            </div>
            <div
              className={`${
                tweet?.bookmarked ? "text-green-600" : "text-gray-600"
              } space-x-1 flex items-center hover:text-green-600`}
            >
              <BookmarkAddIcon
                className="cursor-pointer"
                onClick={handleCreateBookmark}
              />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <section>
        <ReplayTweet
          item={tweet}
          open={openTweetReplay}
          handleClose={handleCloseTweetReplay}
        />
      </section>
    </div>
  );
};

export default TweetCard;
