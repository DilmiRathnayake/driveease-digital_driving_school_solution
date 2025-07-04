import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeRouteName } from "../../Features/Route/routeSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeRouteName("Dashboard"));
  }, [dispatch]);
  return <div>Dashboard</div>;
};

export default Home;
