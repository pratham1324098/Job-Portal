import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import axios from "axios";
import { setUser } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const getUser = useCallback(async () => {
    try {
      dispatch(showLoading());
      // const { data } = await axios.get(
      //   "/api/v1/user/getUser",
      //   // { token: localStorage.getItem("token") },
      //    {
      //     headers: {
      //       Authorization: `Bearer ${localStorage.getItem("token")}`,
      //     },
      //     params:{ userId: localStorage.getItem("userId") },
      //   },
      // );
      const { data } = await axios.get("/api/v1/user/getUser", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        user: {
          userId: localStorage.getItem("userId"),
        },
      });
      dispatch(hideLoading());
      if (data.success) {
        dispatch(setUser(data.data));
      } else {
        localStorage.clear();
        <Navigate to="/login" />;
      }
    } catch (error) {
      localStorage.clear();
      dispatch(hideLoading());
      console.log(error);
    }
  },[dispatch]);
  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        await getUser();
      }
    };
  
    fetchData();
  
    // Include `getUser` and `user` in the dependency array
  }, [getUser,user]);

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;