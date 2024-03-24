import { Grid } from "@mui/material";
import React from "react";
import Navigation from "../Navigation/Navigation";
import HomeSection from "../HomeSection/HomeSection";
import SearchTrending from "../SearchTrending/SearchTrending";
import { Route, Routes } from "react-router-dom";
import Profile from "../Profile/Profile";
import TweetDetails from "../TweetDetails/TweetDetails";
import EditProfile from "../Profile/EditProfile";
import Bookmark from "../HomeSection/Bookmark";
import VerifiedSuccess from "../SearchTrending/VerifiedSuccess";
import Verified from "../SearchTrending/Verified";

const HomePage = () => {
  return (
    <Grid
      container
      xs={12}
      className="px-2 md:px-12 lg:px-30 xl:35  justify-between"
    >
      <Grid item xs={0} md={2} lg={2} className="hidden lg:block relative">
        <Navigation />
      </Grid>
      <Grid item xs={12} md={7} lg={6.5} className="md:block relative border">
        <Routes>
          <Route path="/" element={<HomeSection />}></Route>
          <Route path="/home" element={<HomeSection />}></Route>
          <Route path="/profile/:id" element={<Profile />}></Route>
          <Route path="/tweet/:id" element={<TweetDetails />}></Route>
          <Route path="/editprofile" element={<EditProfile />}></Route>
          <Route path="/bookmarks" element={<Bookmark />}></Route>
          <Route path="/verified" element={<Verified />}></Route>
        </Routes>
      </Grid>
      <Grid item xs={0} md={3} lg={3} className="hidden lg:block relative">
        <SearchTrending />
      </Grid>
    </Grid>
  );
};

export default HomePage;
