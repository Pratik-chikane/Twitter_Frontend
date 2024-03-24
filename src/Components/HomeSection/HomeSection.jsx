import { Avatar, Button, TextField } from "@mui/material";
import { Form, useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import ImageIcon from "@mui/icons-material/Image";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TweetCard from "./TweetCard";
import toast, { Toaster, useToaster } from "react-hot-toast";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useDispatch, useSelector } from "react-redux";
import { createTweet, getAllTweets } from "../../Store/Tweet/Action";
import { store } from "../../Store/Store";
import { uploadToCloudinary } from "./Util/UploadToCloudinary";
import BackdropComponent from "../Backdrop/BackdropComponent";

import SlideshowIcon from "@mui/icons-material/Slideshow";
import { getVideoDuration } from "./Util/VideoDuration";
import { useVideoScrollControl } from "./Util/Scroll";
import {
  VIDEO_LENGTH_LIMIT_FOR_NORMAL,
  VIDEO_LENGTH_LIMIT_FOR_PREMIUM,
} from "./Util/TwitterConstants";
const validationSchema = Yup.object().shape({
  content: Yup.string().required("Tweet cannot be empty"),
});

const HomeSection = () => {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedVideo, setSelectedVideo] = useState("");
  const toaster = useToaster();
  const charLimit = false ? 250 : 500;
  const [charCount, setCharCount] = useState(charLimit);
  const dispatch = useDispatch();
  const { tweet, auth } = useSelector((store) => store);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSubmit = (values, actions) => {
    console.log("VALUES", values);
    dispatch(createTweet(values))
      .then(() => {
        toast.success("Tweet created");
        setSelectedImage("");
        setSelectedVideo("");
        setCharCount(charLimit);
        actions.resetForm();
        setShowEmojiPicker(showEmojiPicker);
      })
      .catch((error) => {
        toast.error("Tweet creation failed");
      });
  };

  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
      video: "",
      isTweet: true,
    },
    onSubmit: handleSubmit,
    validationSchema,
  });
  const handleSelectImage = async (event) => {
    setUploadingImage(true);
    const imgUrl = await uploadToCloudinary(event.target.files[0], "image");
    formik.setFieldValue("image", imgUrl);
    setSelectedImage(imgUrl);
    setUploadingImage(false);
  };

  const handleSelectVideo = async (event) => {
    setUploadingImage(true);
    console.log("YPLODING");
    const file = event.target.files[0];
    const durationInSeconds = await getVideoDuration(file);
    console.log("YPLODING", durationInSeconds);
    const maxDuration = auth?.user.verifed
      ? VIDEO_LENGTH_LIMIT_FOR_PREMIUM
      : VIDEO_LENGTH_LIMIT_FOR_NORMAL;
    console.log("DURATION " + maxDuration);
    if (!isNaN(durationInSeconds) && durationInSeconds <= maxDuration) {
      const uploadedVideoUrl = await uploadToCloudinary(file, "video");
      formik.setFieldValue("video", uploadedVideoUrl);
      setSelectedVideo(uploadedVideoUrl);
    } else {
      toast.error(
        `${VIDEO_LENGTH_LIMIT_FOR_NORMAL}s is limit for non verifed user`
      );
    }
    setUploadingImage(false);
    console.log("DURATION " + durationInSeconds);
  };
  const handleInputChange = (e) => {
    const { value } = e.target;
    const remainingChars = charLimit - value.length;
    setCharCount(remainingChars);
    formik.setFieldValue("content", value);
  };
  const handleDisplayError = (message) => {
    toast.error(message);
  };

  const handleEmojiClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiSelect = (emoji) => {
    console.log(emoji);
    const updatedContent = formik.values.content + emoji.native;
    formik.setFieldValue("content", updatedContent);
  };

  useEffect(() => {
    if (formik.touched.content && formik.errors.content) {
      handleDisplayError(formik.errors.content);
    }
  }, [formik.touched.content, formik.errors.content]);

  useEffect(() => {
    dispatch(getAllTweets());
  }, [tweet.like, tweet.bookmark, tweet.retweet, tweet.tweet]);

  return (
    <div className="m-2 mb-5 lg:m-5 lg:mb-10">
      <Toaster />
      <section>
        <h1 className="py-3 text-2xl font-bold opacity-80">Home</h1>
        <hr />
      </section>
      <section className={`pt-5 lg:pt-10 pb-2 lg:pb-5`}>
        <div className="flex space-x-5">
          <Avatar alt="USERNAME" src={auth?.user?.profileImage} />
          <div className="w-full relative">
            <form onSubmit={formik.handleSubmit} className="pb-5">
              <React.Fragment>
                <TextField
                  className={`border-none outline-none text-xl bg-transparent`}
                  type="text"
                  multiline
                  name="content"
                  variant="standard"
                  inputProps={{ maxLength: charLimit }}
                  placeholder="What is happening?!"
                  onChange={handleInputChange}
                  value={formik.values.content}
                  style={{ width: "100%" }}
                  InputProps={{
                    style: { fontSize: "1.2rem" },
                  }}
                />
                <div className="text-gray-500 text-sm pt-1 pb-3">
                  <span>{charCount} characters remaining</span>
                </div>
              </React.Fragment>

              {!uploadingImage && (
                <div>
                  {selectedImage && (
                    <img className="w-[28rem]" src={selectedImage} alt="" />
                  )}

                  {selectedVideo && (
                    <video controls autoPlay loop muted src={tweet.video} />
                  )}
                </div>
              )}

              <div className="flex justify-between items-center mt-2">
                <div className="flex space-x-5 items-center pt-3">
                  <label className="flex space-x-2 rounded-md cursor-pointer">
                    <ImageIcon className="text-[#1d9bf0]" />
                    <input
                      type="file"
                      name="imageFile"
                      className="hidden"
                      onChange={handleSelectImage}
                    />
                  </label>
                  <label className="flex items-center space-x-2  rounded-md cursor-pointer">
                    <SlideshowIcon className="text-[#1d9bf0]" />
                    <input
                      type="file"
                      name="videoFile"
                      className="hidden"
                      onChange={handleSelectVideo}
                    />
                  </label>

                  <label className="flex space-x-2 rounded-md cursor-pointer">
                    <TagFacesIcon
                      onClick={handleEmojiClick}
                      className="text-[#1d9bf0]"
                    />
                    {showEmojiPicker && (
                      <div className="z-50 absolute mt-8">
                        <Picker
                          data={data}
                          theme={"light"}
                          emojiSize={22}
                          maxFrequentRows={1}
                          previewPosition={"none"}
                          onEmojiSelect={handleEmojiSelect}
                        />
                      </div>
                    )}
                  </label>
                </div>
                <div>
                  <Button
                    sx={{
                      width: "100%",
                      borderRadius: "20px",
                      paddingY: "8px",
                      paddingX: "20px",
                      bgcolor: "#1e88e5",
                    }}
                    variant="contained"
                    type="submit"
                  >
                    Post
                  </Button>
                </div>
              </div>
            </form>
            <hr />
          </div>
        </div>
      </section>

      <section>
        {tweet.tweets.map((tweet) => (
          <TweetCard tweet={tweet} />
        ))}
      </section>
      <section>
        <BackdropComponent open={uploadingImage} />
      </section>
    </div>
  );
};

export default HomeSection;
