import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as Yup from "yup";
import { blue } from "@mui/material/colors";
import AuthModal from "./AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, loginUser } from "../../Store/Auth/Action";
import { store } from "../../Store/Store";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Enter valid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(3, "Password must be at least 3 characters")
    .max(50),
});
const SigninForm = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();
  // const formik = useFormik({
  //   initialValues: {
  //     email: "",
  //     password: "",
  //   },
  //   validationSchema,
  //   onSubmit: (values) => {
  //     console.log(values);
  //     dispatch(loginUser(values));
  //   },
  // });
  const jwt = localStorage.getItem("jwt");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values))
        .then((result) => {
          if (jwt != null) {
            dispatch(getUserProfile(jwt));
            navigate("/");
            console.log("HELOO");
          } else {
            console.log("ERROR+++++++++++");
          }
        })
        .catch((err) => {
      
        });
    }, // Remove the extra semicolon here
  });

  //     console.log("FORM VALUES", values);
  //   },
  // });
  // const formik = useFormik({
  //   initialValues: {
  //     email: "",
  //     password: "",
  //   },
  //   validationSchema,
  //   onSubmit: (values) => {
  //     dispatch(loginUser(values));

  //     console.log("FORM VALUES", values);
  //   },
  // });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h1 className="text-center text-3xl font-bold pb-8 pt-2">
        Sign in to twitter
      </h1>
      <Grid container spacing={2} className="flex justify-center ">
        <Grid item xs={10}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            variant="standard"
            size="large"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={10} className="pb-8">
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            variant="standard"
            size="large"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
        <Grid item xs={12} className="flex justify-center">
          <Button
            variant="contained"
            type="submit"
            size="medium"
            sx={{
              borderRadius: "29px",
              py: "10px",
              bgColor: blue[500],
              width: "50%",
            }}
          >
            Sign in
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SigninForm;
