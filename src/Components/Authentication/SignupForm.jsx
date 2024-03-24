import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as Yup from "yup";
import { blue } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { registerUser } from "../../Store/Auth/Action";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Enter valid email").required("Email is required"),
  password: Yup.string().required("Password is required").min(3).max(50),
  fullName: Yup.string().required("Full Name is required").min(5).max(50),
  // dateOfBirth: Yup.string().required("Date of birth is required"),
});
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 125 }, (_, i) => currentYear - i);
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];
const SignupForm = () => {

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      fullName: "",
      dateOfBirth: {
        day: "",
        month: "",
        year: "",
      },
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Sigup VALUES", values);
      const { day, month, year } = values.dateOfBirth;
      const dateOfBirth = `${year}-${month}-${day}`;
      values.dateOfBirth = dateOfBirth;
      dispatch(registerUser(values));
    
    },
  });

  const handleDateChange = (name) => (event) => {
    formik.setFieldValue("dateOfBirth", {
      ...formik.values.dateOfBirth,
      [name]: event.target.value,
    });
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <h1 className="text-center text-3xl font-bold pb-5 ">
        Join twitter today
      </h1>

      <Grid container spacing={1} className="flex justify-center ">
        <Grid item xs={10}>
          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            variant="standard"
            size="large"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />
        </Grid>
        <Grid item xs={10} className="pb-2">
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
        <Grid item xs={3} className="">
          <InputLabel>Date</InputLabel>
          <Select
            name="day"
            variant="standard"
            value={formik.values.dateOfBirth.day}
            onChange={handleDateChange("day")}
            onBlur={formik.handleBlur}
            fullWidth
          >
            {days.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={4}>
          <InputLabel>Months</InputLabel>
          <Select
            name="month"
            variant="standard"
            value={formik.values.dateOfBirth.month}
            onChange={handleDateChange("month")}
            onBlur={formik.handleBlur}
            fullWidth
          >
            {months.map((month) => (
              <MenuItem key={month.label} value={month.value}>
                {month.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={3}>
          <InputLabel>Year</InputLabel>
          <Select
            name="year"
            variant="standard"
            value={formik.values.dateOfBirth.year}
            onChange={handleDateChange("year")}
            onBlur={formik.handleBlur}
            fullWidth
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={10} className="pb-5">
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
              alignItems: "center",
            }}
          >
            Sign up
          </Button>
        </Grid>
      </Grid>
      
    </form>
    
  );
};

export default SignupForm;
