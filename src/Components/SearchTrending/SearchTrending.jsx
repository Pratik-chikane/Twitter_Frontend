import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { Avatar, Button } from "@mui/material";
import ProfileCard from "./ProfileCard";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../../Store/Auth/Action";
import SubscriptionModel from "./SubscriptionModel";
import { store } from "../../Store/Store";
import { useNavigate } from "react-router-dom";

const SearchTrending = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [openSubscriptionModal, setOpenSubscriptionModal] = useState(false);
  const handleCloseSubscriptionMadal = () => setOpenSubscriptionModal(false);
  const handleOpenSubscriptionModal = () => setOpenSubscriptionModal(true);
  const fullName = auth?.findUser?.fullName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const handleSearchUser = (event) => {
    setSearch(event.target.value);
    dispatch(searchUser(event.target.value));
  };
  const navigateToProfile = (id) => {
    navigate(`/profile/${id}`);
    setSearch("");
  };
  return (
    <div className="py-5 sticky top-0 overflow-y-hidden">
      {/* <div className="hideScrollbar overflow-y-scroll"> */}
      <div className="relative flex items-center">
        <input
          value={search}
          onChange={handleSearchUser}
          type="text"
          placeholder="Search Twitter"
          className="py-3 rounded-full outline-none bg-gray-100 w-full pl-12 "
        />
        <span className="absolute top-0 left-0 pl-3 pt-3">
          <SearchIcon className="text-gray-500" />
        </span>
        {search && (
          <div className=" overflow-y-auto hideScrollBar bg-gray-100 absolute z-50 top-16  h-[40vh] w-full rounded-xl  border-2 border-solid shadow-xl">
            {auth.searchResult.map((item) => (
              <>
              <div
                onClick={() => navigateToProfile(item.id)}
                className="flex items-center  p-3 cursor-pointer"
              >
                <Avatar alt={item.fullName} src={item.profileImage} />
                <div className="ml-2">
                  <p>
                    {item?.fullName
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </p>
                  <p className="text-sm text-gray-400">
                    @{item.fullName.split(" ").join("").toLowerCase()}
                  </p>
                 
                </div>
             
              </div>
              <hr style={{ color: 'red' }}/>
              </>
            ))}
          </div>
        )}
        {/* <Brightness4Icon
            onClick={handleChangeTheme}
            className="ml-3 cursor-pointer"
          /> */}
      </div>

      <section className="my-5 p-5 bg-gray-100 rounded-3xl">
        <h1 className="text-xl font-bold">Subscribe to Premium</h1>
        <h1 className="font-medium my-2">
          Subscribe to unlock new features and if eligible, receive a share of
          ads revenue.
        </h1>
        <Button
          onClick={handleOpenSubscriptionModal}
          variant="contained"
          sx={{ padding: "10px", paddingX: "20px", borderRadius: "25px" }}
        >
          {" "}
          Subscribe
        </Button>
      </section>

      <div>
        <section className=" space-y-3 px-6 py-4 bg-gray-100 rounded-3xl ">
          <h1 className="font-bold text-xl py-1">What's happening</h1>
          <hr />
          {[1, 1, 1].map((item) => (
            <div>
              <p className="text-sm">ICC World Cup LIVE</p>
              <p className="font-bold">IND VS AUS</p>
              <p className="text-md text-gray-500">54.7k tweets</p>
            </div>
          ))}
        </section>
        <section className="mt-7 space-y-3 px-5 py-4 bg-gray-100 rounded-3xl">
          <h1 className=" text-xl font-bold opacity-80">Who to follow</h1>
          <hr />
          {[1, 1, 1].map((item) => (
            <ProfileCard />
          ))}
        </section>
      </div>
      {/* </div> */}
      <SubscriptionModel
        open={openSubscriptionModal}
        handleClose={handleCloseSubscriptionMadal}
      />
    </div>
  );
};

export default SearchTrending;
