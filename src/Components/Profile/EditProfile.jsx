import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, TextField } from "@mui/material";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import { Translate } from "@mui/icons-material";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUserProfile } from "../../Store/Auth/Action";
import { uploadToCloudinary } from "../HomeSection/Util/UploadToCloudinary";
import { store } from "../../Store/Store";
import BackdropComponent from "../Backdrop/BackdropComponent";
const EditProfile = () => {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const [uploadingImage, setUploadingImage] = useState(" ");
  const { auth } = useSelector((store) => store);

  const handleNavigateBack = () => navigate(-1);
  const handleSubmit = (values) => {
    console.log("HANDLE SUBMIT");
    console.log("HANDLE SUBMIT ", values);
    dispatch(updateUserProfile(values))
      .then(() => {
        setUploadingImage("");

        navigate(-1);
        toast.success("Profile updated successfully");
        dispatch(getUserProfile(localStorage.getItem("jwt")));
      })
      .catch((error) => {
        toast.error("Profile updation failed");
      });
  };
  const formik = useFormik({
    initialValues: {
      fullName: "",
      website: "",
      location: "",
      bio: "",
      backgroundImage: "",
      profileImage: "",
      dateOfBirth: "",
    },
    onSubmit: handleSubmit,
  });
  useEffect(() => {
    formik.setValues({
      fullName: auth.user.fullName || "",
      website: auth.user.website || "",
      location: auth.user.location || "",
      bio: auth.user.bio || "",
      backgroundImage: auth.user.backgroundImage || "",
      profileImage: auth.user.profileImage || "",
    });
  }, [auth.user]);
  const handleImageChange = async (event) => {
    setUploading(true);
    console.log("+++++++++++++++", event.target.name);
    const { name } = event.target;
    const file = await uploadToCloudinary(event.target.files[0]);
    console.log("EDIT PROFILE URL", file);
    formik.setFieldValue(name, file);

    setUploading(false);
  };

  const handleDateChange = (date) => {
    formik.setFieldValue("dateOfBirth", date);
  };
  return (
    <div className="mb-20">
      <Toaster />
      <form onSubmit={formik.handleSubmit}>
        <section
          className={
            "bg-white z-50 flex items-center sticky top-0 bg-opacity-90 px-5"
          }
        >
          <CloseIcon className="cursor-pointer" onClick={handleNavigateBack} />
          <h1 className="py-5 text-xl font-bold opacity-90 ml-5">
            Edit Profile
          </h1>
          <div className="ml-auto">
            <Button className="text-black" type="onSubmit">
              Save
            </Button>
          </div>
        </section>
        <div className="relative">
          <img
            className="w-[100%] h-[15rem] object-cover bg-gray-100"
            src={auth?.user.backgroundImage}
            alt=""
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <label htmlFor="background-image-upload" className="cursor-pointer">
              <div className="relative">
                <AddAPhotoOutlinedIcon
                  style={{
                    fontSize: 80,
                    color: "white",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
                <input
                  id="background-image-upload"
                  type="file"
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  name="backgroundImage"
                  onChange={handleImageChange}
                />
              </div>
            </label>
          </div>
        </div>

        <div className="mt-5 h-[5rem] px-5 relative">
          <Avatar
            className="transform -translate-y-24"
            alt="USERNAME"
            src={auth?.user.profileImage}
            sx={{ width: "10rem", height: "10rem", border: "4px solid white" }}
          />
          <div className="ml-14 relative">
            <label htmlFor="profile-image-upload" className="cursor-pointer">
              <div className="relative">
                <AddAPhotoOutlinedIcon
                  style={{
                    fontSize: 50,
                    color: "white",
                  }}
                  className="transform -translate-y-52"
                />
                <input
                  id="profile-image-upload"
                  type="file"
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  name="profileImage"
                  onChange={handleImageChange}
                />
              </div>
            </label>
          </div>
        </div>

        <div className="space-y-3 px-10">
          <TextField
            fullWidth
            id="fullName"
            name="fullName"
            variant="standard"
            label="Full Name"
            value={formik.values.fullName || auth?.user.fullName}
            onChange={formik.handleChange}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            id="bio"
            variant="standard"
            name="bio"
            label="Bio"
            value={formik.values.bio || auth?.user.bio}
            onChange={formik.handleChange}
            error={formik.touched.bio && Boolean(formik.errors.bio)}
            helperText={formik.touched.bio && formik.errors.bio}
          />
          <TextField
            fullWidth
            id="location"
            name="location"
            variant="standard"
            label="Location"
            value={formik.values.location || auth?.user.location}
            onChange={formik.handleChange}
            error={formik.touched.location && Boolean(formik.errors.location)}
            helperText={formik.touched.location && formik.errors.location}
          />
          <TextField
            fullWidth
            id="website"
            name="website"
            variant="standard"
            label="Website"
            value={formik.values.website || auth?.user.website}
            onChange={formik.handleChange}
            error={formik.touched.website && Boolean(formik.errors.website)}
            helperText={formik.touched.website && formik.errors.website}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Birth Date"
              onChange={handleDateChange}
              slotProps={{
                textField: {
                  variant: "standard",
                  id: "dateOfBirth",
                  name: "dateOfBirth",
                },
              }}
              sx={{ width: "100%" }}
            />
          </LocalizationProvider>
        </div>
        <BackdropComponent open={uploading} />
      </form>
    </div>
  );
};

export default EditProfile;
