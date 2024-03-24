import React from "react";
import { navigationMenu } from "./NavigationMenu";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ProfileCard from "../SearchTrending/ProfileCard";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../Store/Store";
import { logout } from "../../Store/Auth/Action";

const Navigation = () => {
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const fullName = auth?.user?.fullName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    console.log("LOGOUT");
    dispatch(logout());

    setAnchorEl(null);
  };

  return (
    <div className="h-screen sticky top-0">
      <div>
        <div
          className="py-5
        "
        >
          <img
            height={80}
            width={80}
            src="https://drive.google.com/uc?export=view&id=1D2mY8hdtWlK7xuzJeqMuNrsbmo13flZE"
            alt=""
          />
        </div>
        <div className="space-y-6">
          {navigationMenu.map((item) => (
            <div
              className="cursor-pointer flex space-x-3 items-center"
              onClick={() =>
                item.title === "Profile"
                  ? navigate(`/profile/${auth?.user.id}`)
                  : item.title === "Bookmark"
                  ? navigate(`/bookmark/${auth?.user.id}`)
                  : navigate(item.path)
              }
            >
              {item.icon}
              <p className="text-xl">{item.title}</p>
            </div>
          ))}
        </div>
        {/* <div className="p-7">
          <Button
            sx={{
              width: "100%",
              borderRadius: "30px",
              py: "13px",
              bgcolor: "#1e88e5",
            }}
            variant="contained"
          >
            Post
          </Button>
        </div> */}
      </div>

      <div className="flex items-center justify-between pt-8">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => navigate(`/profile/${auth?.user.id}`)}
        >
          <div className="flex items-center space-x-3">
            <Avatar alt="USERNAME" src={auth?.user?.profileImage} />

            <div className="flex flex-col">
              <div className="flex">
                <p>{fullName}</p>
                {auth?.user?.verified && (
                  <img
                    className="ml-2 w-4 h-4"
                    src="https://drive.google.com/uc?export=view&id=1EmV6YNlUaWDu-kmmoRc1JN1AJQHPlZEJ"
                    alt=""
                  />
                )}
              </div>

              <p className="opacity-50">
                @{auth.user?.fullName?.toLowerCase().split(" ").join("")}
              </p>
            </div>
          </div>
        </div>

        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreHorizIcon />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Navigation;
