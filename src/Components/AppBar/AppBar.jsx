import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Logo from "../../Images/DriveEase_logo.jpg";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsDrawerOpened } from "../../Features/Route/routeSlice";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SchoolIcon from "@mui/icons-material/School";
import SettingsIcon from "@mui/icons-material/Settings";
import { logoutUser } from "../../Features/User/userSlice";
import { getUserFromLocalStorage } from "../../Utils/localStorage";

import { Collapse } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const drawerWidth = 240;

const array = [
  { id: 1, name: "test 01" },
  { id: 2, name: "test 02" },
  { id: 3, name: "test 03" },
];

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();

  const { user } = useSelector((state) => state.user);
  const { isDrawerOpened, routeName } = useSelector((state) => state.route);

  const handleDrawerOpen = () => {
    dispatch(setIsDrawerOpened(true));
  };

  const handleDrawerClose = () => {
    dispatch(setIsDrawerOpened(false));
  };

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  const getGroups = () => {
    try {
      const data = user?.user_privileges;

      if (!data || data.length === 0) {
        return [];
      }

      const filteredData = data.filter((item) => item.user_module_id > 2);

      const sortedData = filteredData.sort(
        (a, b) => b.user_module_id - a.user_module_id
      );

      return sortedData;
    } catch (error) {
      dispatch(logoutUser());
    }
  };

  const getRemainingGroups = () => {
    try {
      const data = user?.user_privileges;

      if (!data || data.length === 0) {
        return [];
      }

      const filteredData = data.filter((item) => item.user_module_id < 3);

      const sortedData = filteredData.sort(
        (a, b) => b.user_module_id - a.user_module_id
      );

      return sortedData;
    } catch (error) {
      dispatch(logoutUser());
      return [];
    }
  };

  const [open, setOpen] = useState({});

  const handleClick = (index) => {
    setOpen((prevOpen) => ({ ...prevOpen, [index]: !prevOpen[index] }));
  };

  useEffect(() => {
    const user = getUserFromLocalStorage();

    if (user && Array.isArray(user.user_privileges)) {
      const currentPath = location.pathname.replace(/^\//, "");

      const isAuthorized = user.user_privileges.some((privilege) => {
        if (privilege.usermodules.navigation_url === "") {
          return currentPath === "";
        }
        return currentPath.startsWith(privilege.usermodules.navigation_url);
      });

      if (!isAuthorized) {
        console.log("Not Authorized, Logging out...");
        dispatch(logoutUser());
      } else {
        console.log("Authorized");
      }
    } else {
      console.log("No User Privileges Found, Logging out...");
      dispatch(logoutUser());
    }
  }, [location, dispatch]);

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" open={isDrawerOpened}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(isDrawerOpened && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {routeName}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <AccountCircleIcon />
          <Typography sx={{ ml: 1 }} variant="h10" noWrap component="div">
            <Link style={{ textDecoration: "none", color: "#5a5a5d" }}>
              <span style={{ color: "White" }}>{user?.user?.first_name}</span>
            </Link>
          </Typography>
          <Typography sx={{ ml: 3 }} variant="h6" noWrap component="div">
            <Link
              style={{ textDecoration: "none", color: "#5a5a5d" }}
              to={"/"}
              onClick={logoutHandler}
            >
              <span style={{ color: "White" }}>Log Out</span>
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={isDrawerOpened}
      >
        <DrawerHeader sx={{ backgroundColor: "#1976d2" }}>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <Box
              component="img"
              sx={{
                height: 50,
                width: 160,
                maxHeight: { xs: 50, md: 50 },
                maxWidth: { xs: 160, md: 160 },
              }}
              src={`${Logo}`}
            />
          </Link>
          <IconButton sx={{ color: "white" }} onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          {getGroups().map((item, index) => (
            <Link
              key={index}
              to={item.usermodules?.navigation_url}
              style={{ textDecoration: "none", color: "gray" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {item.usermodules?.navigation_url === "dashboard" ? (
                      <SpaceDashboardIcon />
                    ) : item.usermodules?.navigation_url === "schedule" ? (
                      <CalendarMonthIcon />
                    ) : item.usermodules?.navigation_url === "instructors" ? (
                      <ManageAccountsIcon />
                    ) : item.usermodules?.navigation_url === "vehicles" ? (
                      <DirectionsCarIcon />
                    ) : item.usermodules?.navigation_url === "courses" ? (
                      <AutoStoriesIcon />
                    ) : item.usermodules?.navigation_url === "students" ? (
                      <PersonAddIcon />
                    ) : (
                      <SpaceDashboardIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={item.usermodules?.module_name} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {getRemainingGroups().map((item, index) => (
            <Link
              key={index}
              to={item.usermodules?.navigation_url}
              style={{ textDecoration: "none", color: "gray" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {item.usermodules?.navigation_url === "accountdetail" ? (
                      <SchoolIcon />
                    ) : item.usermodules?.navigation_url === "settings" ? (
                      <SettingsIcon />
                    ) : (
                      <SchoolIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={item.usermodules?.module_name} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>

        {/* <List>
          {getGroups().map((item, index) => (
            <div key={index}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleClick(index)}>
                  <ListItemIcon>
                    {item.usermodules?.navigation_url === "dashboard" ? (
                      <SpaceDashboardIcon />
                    ) : item.usermodules?.navigation_url === "schedule" ? (
                      <CalendarMonthIcon />
                    ) : item.usermodules?.navigation_url === "instructors" ? (
                      <ManageAccountsIcon />
                    ) : item.usermodules?.navigation_url === "vehicles" ? (
                      <DirectionsCarIcon />
                    ) : item.usermodules?.navigation_url === "courses" ? (
                      <AutoStoriesIcon />
                    ) : item.usermodules?.navigation_url === "students" ? (
                      <PersonAddIcon />
                    ) : (
                      <SpaceDashboardIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={item.usermodules?.module_name} />
                  {open[index] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse in={open[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {array?.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      to={subItem.navigation_url}
                      style={{ textDecoration: "none", color: "gray" }}
                    >
                      <ListItem disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon>
                            <SpaceDashboardIcon />
                          </ListItemIcon>
                          <ListItemText primary={subItem.module_name} />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </Collapse>
            </div>
          ))}
        </List> */}
      </Drawer>
    </>
  );
}
