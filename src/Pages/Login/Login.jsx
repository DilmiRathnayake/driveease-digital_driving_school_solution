import {
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { Warning, Error } from "../../Components/Notification/Notification";
import { useDispatch } from "react-redux";
import { loginUser } from "../../Features/User/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [valid, setValid] = useState(true);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
    setValid(validateEmail(event.target.value));
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      if (validateEmail(userName)) {
        setValid(true);
      } else {
        setValid(false);
      }

      if (!valid) {
        Warning("Please check email validity");
      } else if (values.password === "") {
        Warning("Please enter password");
      } else if (userName === "") {
        Warning("Please enter User Name");
      } else {
        await dispatch(
          loginUser({ email: userName, password: values.password })
        );

        await navigate("/");
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      Error(error.message);
    }
  };

  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        {/* <Logo image={logoImage} width={'12rem'} /> */}
        <Card
          sx={{
            width: "100%",
            borderRadius: "0.5rem",
            marginTop: "1.3rem",
            boxShadow: 3,
          }}
        >
          <CardContent>
            <Typography
              textAlign="center"
              fontWeight="bold"
              fontSize="1.8rem"
              sx={{
                borderBottom: "2px solid gray",
                paddingBottom: "1.2rem",
                borderColor: "lightGray.main",
                m: "1rem",
              }}
            >
              Sign In
            </Typography>

            <form
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "2rem",
              }}
              autoComplete="off"
            >
              <Typography
                fontSize={"1rem"}
                sx={{ ml: "1rem", color: "#5A5A5A" }}
              >
                Email
              </Typography>
              <TextField
                id="email"
                value={userName}
                onChange={handleUserNameChange}
                InputLabelProps={{ shrink: false }}
                sx={{ m: "1rem", mt: "0.3rem" }}
                placeholder="Email"
              ></TextField>
              <Typography
                fontSize={"1rem"}
                sx={{ ml: "1rem", color: "#5A5A5A" }}
              >
                Password
              </Typography>
              <FormControl sx={{ m: "1rem" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <Typography
                sx={{
                  borderBottom: "2px solid gray",
                  paddingBottom: "1.2rem",
                  borderColor: "lightGray.main",
                  m: "1rem",
                  mt: "0",
                }}
              ></Typography>
              <Box
                sx={{
                  mt: "1.3rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {" "}
                <Button
                  onClick={handleLogin}
                  disabled={isLoading}
                  variant="contained"
                  sx={{
                    width: "10rem",
                    py: "0.7rem",
                    fontWeight: "bold",
                    backgroundColor: "black",
                  }}
                >
                  Login
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Login;
