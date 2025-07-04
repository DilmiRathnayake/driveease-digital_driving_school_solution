import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeRouteName } from "../../Features/Route/routeSlice";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import "./Setting.css";
import SystemUser from "./SystemUser";
import UserLevel from "./UserLevel";
import VehicleType from "./VehicleType";
import VehicleModel from "./VehicleModel";

const Setting = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(changeRouteName("Settings"));
  }, [dispatch]);

  return (
    <>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="System User" value="1" />
              <Tab label="User Level" value="2" />
              <Tab label="Vehicle Type" value="3" />
              <Tab label="Vehicle Model" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <SystemUser />
          </TabPanel>
          <TabPanel value="2">
            <UserLevel />
          </TabPanel>
          <TabPanel value="3">
            <VehicleType />
          </TabPanel>
          <TabPanel value="4">
            <VehicleModel />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default Setting;
