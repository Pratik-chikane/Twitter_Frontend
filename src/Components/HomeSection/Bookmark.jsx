import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import TweetCard from "./TweetCard";
import { store } from "../../Store/Store";
import { getAllUsersBookmarkTweets } from "../../Store/Tweet/Action";

const Bookmark = () => {
  const dispatch = useDispatch();
  const { tweet, auth } = useSelector((store) => store);
  const { id } = useParams();
  const navigate = useNavigate();


  const handleNavigateBack = () => navigate(-1);
  useEffect(() => {
    dispatch(getAllUsersBookmarkTweets(auth?.user.id));
  }, [auth?.user.id]);
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
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">Your Bookmarks</h1>
       
      </section>
      <hr />
      <div className="px-1 md:px-6 my-5 space-y-2">
     
        {tweet?.bookmarkTweets?.length === 0 ? (
        
            <h1 className="font-bold text-3xl text-center py-10">
              No Bookmark Saved
            </h1>
      
        ) : (
          tweet?.bookmarkTweets?.map((item) => (
            <TweetCard key={item.id} item={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default Bookmark;
