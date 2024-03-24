import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import MessageIcon from "@mui/icons-material/Message";
import ListAltIcon from "@mui/icons-material/ListAlt";
import GroupIcon from "@mui/icons-material/Group";
import VerifiedIcon from "@mui/icons-material/Verified";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PendingIcon from "@mui/icons-material/Pending";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";

export const navigationMenu = [
  {
    title: "Home",
    icon: <HomeIcon />,
    path: "/",
  },
  {
    title: "Explore",
    icon: <ExploreIcon />,
    path: "/explore",
  },
  {
    title: "Notifications",
    icon: <CircleNotificationsIcon />,
    path: "/notification",
  },
  {
    title: "Messages",
    icon: <MessageIcon />,
    path: "/messages",
  },
   {
    title: "Bookmarks",
    icon: <BookmarkBorderOutlinedIcon />,
    path: "/bookmarks",
  },
  {
    title: "Verified",
    icon: <VerifiedIcon />,
    path: "/verified",
  },
  {
    title: "Profile",
    icon: <AccountCircleIcon />,
    path: "/profile",
  },
 
];
