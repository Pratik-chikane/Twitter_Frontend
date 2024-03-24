import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import TweetCard from "../HomeSection/TweetCard";
import { Divider } from "@mui/material";
import ReplayTweet from "./ReplayTweet";
import { useDispatch, useSelector } from "react-redux";
import { findTweetById } from "../../Store/Tweet/Action";
import { store } from "../../Store/Store";
const TweetDetails = () => {
  const navigate = useNavigate();
  const handleNavigateBack = () => navigate(-1);
  const dispatch = useDispatch();
  const {id} = useParams();
  const {tweet} = useSelector(store=>store);
  useEffect(()=>{

    if(id){
      dispatch(findTweetById(id))
    }
  },[tweet?.like,tweet?.bookmark,tweet?.retweet])
  return (
    <div className="px-5">
      <section
        className={
          "bg-white z-50 flex items-center sticky top-0 bg-opacity-90 "
        }
      >
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleNavigateBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">Tweet</h1>
      </section>
      <hr />
      <section>
        <TweetCard tweet={tweet.tweet}/>
      </section>

      <section>
        {tweet.tweet?.replayTweets?.map((item) => (
          <TweetCard tweet={item}/>
        ))}
      </section>
    </div>
  );
};

export default TweetDetails;
