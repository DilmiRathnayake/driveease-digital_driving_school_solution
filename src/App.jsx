import "devextreme/dist/css/dx.light.css";
import "./App.css";
import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Schedule from "./Pages/Schedule/Schedule";
import Instructor from "./Pages/Instructor/Instructor";
import Vehicle from "./Pages/Vehicle/Vehicle";
import Course from "./Pages/Course/Course";
import Student from "./Pages/Student/Student";
import AccountDetail from "./Pages/AccountDetail/AccountDetail";
import Setting from "./Pages/Setting/Setting";
import Login from "./Pages/Login/Login";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import AppBar from "./Components/AppBar/AppBar";
import { logoutUser } from "./Features/User/userSlice";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function App() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  const { isDrawerOpened } = useSelector((state) => state.route);

  useEffect(() => {
    const token = user?.access_token;

    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 < Date.now()) {
        dispatch(logoutUser());
        navigate("/");
      }
    }

    if (!user || user === null) {
      dispatch(logoutUser());
      navigate("/");
    }
  }, [user, navigate, dispatch]);

  return (
    <div className="App">
      {user ? (
        <>
          <Box sx={{ display: "flex" }}>
            <AppBar />
            <Main open={isDrawerOpened}>
              <DrawerHeader />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/instructors" element={<Instructor />} />
                <Route path="/vehicles" element={<Vehicle />} />
                <Route path="/courses" element={<Course />} />
                <Route path="/students" element={<Student />} />
                <Route path="/accountdetail" element={<AccountDetail />} />
                <Route path="/settings" element={<Setting />} />
              </Routes>
            </Main>
          </Box>
        </>
      ) : (
        <Routes>
          <Route exact path="/" element={<Login />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
