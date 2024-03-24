import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/Home/HomePage";
import Authentication from "./Components/Authentication/Authentication";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { getUserProfile } from "./Store/Auth/Action";
import { store } from "./Store/Store";
import VerifiedSuccess from "./Components/SearchTrending/VerifiedSuccess";
import Verified from "./Components/SearchTrending/Verified";

function App() {
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt) {
      dispatch(getUserProfile(jwt));
      navigate("/");
    }
  }, [auth.jwt, jwt]);
  return (
    <div className="">
      <Routes>
        <Route
          path="/*"
          element={auth?.user?.fullName ? <HomePage /> : <Authentication />}
        ></Route>

        <Route path="/signin" element={<Authentication />}></Route>
        <Route path="/signup" element={<Authentication />}></Route>
        <Route path="/verified/success" element={<VerifiedSuccess />}></Route>
      </Routes>
    </div>
  );
}

export default App;
