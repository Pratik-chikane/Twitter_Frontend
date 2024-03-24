import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Avatar, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import ImageIcon from "@mui/icons-material/Image";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createTweetReplay } from "../../Store/Tweet/Action";
import {
  CHAR_LIMIT_FOR_PREMIMUM,
  CHAR_LIMIT_FOR_NORMAL,
} from "../HomeSection/Util/TwitterConstants";
import BackdropComponent from "../Backdrop/BackdropComponent";
import { store } from "../../Store/Store";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  bgcolor: "background.paper",
  border: "none",
  boxShadow: 12,
  outline: "none",
  borderRadius: 4,
  p: 4,
  width: ["380px", "400px", "400px", "600px"],
};
const validationSchema = Yup.object().shape({
  content: Yup.string().required("Reply cannot be empty"),
});

export default function ReplayTweet({ item, handleClose, open }) {
  const navigate = useNavigate();
  const charLimit = false ? CHAR_LIMIT_FOR_PREMIMUM : CHAR_LIMIT_FOR_NORMAL;
  const [charCount, setCharCount] = useState(charLimit);
  const {auth} = useSelector((store)=>store)
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const dispatch = useDispatch();
  const fullName = item?.user.fullName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const handleSubmit = (values) => {
    console.log("VALUES", values);

    dispatch(createTweetReplay(values));
    toast.success("Replay successfull");
    setCharCount(charLimit);
    formik.setFieldValue("content", " ");
    handleClose();
  };
  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
      tweetId: item?.id,
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  const handleSelectedImage = (event) => {
    setUploadingImage(true);
    const imgUrl = event.target.files[0];
    formik.setFieldValue("image", imgUrl);
    setSelectedImage(imgUrl);
    setUploadingImage(false);
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
  useEffect(() => {
    if (formik.touched.content && formik.errors.content) {
      handleDisplayError(formik.errors.content);
    }
  }, [formik.touched.content, formik.errors.content]);
  return (
    <div>
      <Toaster />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="">
          <div className="flex space-x-5">
            <Avatar
              onClick={() => navigate(`/profile/${item?.user.id}`)}
              className="cursor-pointer"
              alt="USERNAME"
              src={item?.user.profileImage}
            />
            <div className="w-full">
              <div className="flex justify-between items-center">
                <div className="flex cursor-pointer items-center space-x-2">
                  <span className="font-semibold">{fullName}</span>
                  {item?.user.verified && <img
                    className="ml-2 w-4 h-4"
                    src="https://drive.google.com/uc?export=view&id=1EmV6YNlUaWDu-kmmoRc1JN1AJQHPlZEJ"
                    alt=""
                  />}
                  <span className="text-gray-600">
                    @{item?.user.fullName.split(" ").join("").toLowerCase()} .  {item?.tweetCreatedAt}
                   
                  </span>
                </div>
              </div>
              <div className="mt-2">
                <div
                  onClick={() => navigate(`/tweet/${6}`)}
                  className="cursor-pointer"
                >
                  <p className="mb-2 p-0 ">{item?.content}</p>
                  <p className="text-gray-600">
                    Replaying to @
                    {item?.user.fullName.split(" ").join("").toLowerCase()}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <section className={`pt-5`}>
            <div className="flex space-x-5">
              <Avatar
                alt="USERNAME"
                src={auth?.user.profileImage} //user image fix this
              />
              <div className="w-full">
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <TextField
                      className={`border-none outline-none text-xl bg-transparent`}
                      type="text"
                      multiline
                      name="content"
                      variant="standard"
                      inputProps={{ maxLength: charLimit }}
                      placeholder="Post your replay"
                      onChange={handleInputChange}
                      value={formik.values.content}
                      style={{ width: "100%" }}
                      InputProps={{
                        style: { fontSize: "1rem" },
                      }}
                    />
                    <div className="text-gray-500 text-sm pt-1">
                      <span>{charCount} characters remaining</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-7">
                    <div className="flex space-x-5 items-center pt-3">
                      <label className="flex space-x-2 rounded-md cursor-pointer">
                        <ImageIcon className="text-[#1d9bf0]" />
                        <input
                          type="file"
                          name="imageFile"
                          className="hidden"
                          onChange={handleSelectedImage}
                        />
                      </label>
                      <FmdGoodIcon className="text-[#1d9bf0]" />
                      <TagFacesIcon className="text-[#1d9bf0]" />
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
                        Replay
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
          <section>
            <BackdropComponent open={uploadingImage} />
          </section>
        </Box>
      </Modal>
    </div>
  );
}
