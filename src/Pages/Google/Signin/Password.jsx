import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { baseUrl } from "../../../Services/myAxios";

const validationSchema = yup.object({
  password: yup.string("Enter a password").required("Enter a password"),
});

export const Password = () => {
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [axiosError, setAxiosError] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    state ? console.log("Enter Password") : navigate("/google/signin");
    console.log(user);
  }, [state, navigate]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const pformik = useFormik({
    initialValues: {
      email: state,
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      axios.post(`${baseUrl}/users/login`, values).then(
        function(response) {
          localStorage.setItem("_id", response.data.user._id);
          setAxiosError(undefined);
          setLoading(false);
          setUser(response.data);
          navigate("/techtube");
        },
        function(error) {
          console.log(error.response);
          setAxiosError(error.response.data.msg);
          setLoading(false);
        }
      );

      setLoading(true);
    },
  });

  return (
    <>
      <div className="container-fluid">
        <div
          className="row justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div
            className="text-center signin-form-body"
            style={{ borderRadius: "8px" }}
          >
            {loading ? (
              <Box style={{ width: "100%", marginBottom: "48px" }}>
                <LinearProgress style={{ borderRadius: "8px 8px 0px 0px" }} />
              </Box>
            ) : (
              <></>
            )}
            <div className="myDiv">
              <h1 className="signin-form-h1">Sign in</h1>
              <div className="signin-form-subtitle">
                <span>to TechTube</span>
              </div>
              <form
                className="row justify-content-center align-items-center pr-4 pl-4 pt-4"
                style={{ width: "390px" }}
                onSubmit={pformik.handleSubmit}
              >
                <FormControl
                  fullWidth
                  variant="outlined"
                  error={
                    (pformik.touched.password &&
                      Boolean(pformik.errors.password)) ||
                    Boolean(axiosError)
                  }
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    disabled={loading}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={pformik.values.password}
                    onChange={pformik.handleChange}
                    autoFocus
                    spellCheck="false"
                    autoComplete="off"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onMouseDown={handleMouseDownPassword}
                          onClick={handleClickShowPassword}
                          edge="end"
                          disabled={loading}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                  <FormHelperText id="outlined-weight-helper-text">
                    {(pformik.touched.password && pformik.errors.password) ||
                      axiosError}
                  </FormHelperText>
                </FormControl>
                <div className="col-12 pr-0 pl-0 pt-5">
                  <p
                    className="signin-form-subtitle"
                    style={{ textAlign: "left", fontSize: "14px" }}
                  >
                    Not your computer? Use a private browsing window to sign in.
                  </p>
                </div>

                <div className="col-12 pr-0 pl-0 pt-5 mt-2 d-flex justify-content-between">
                  <Button
                    href="#text-buttons"
                    size="small"
                    style={{ textTransform: "none" }}
                    disabled={loading}
                  >
                    Create account
                  </Button>
                  <Button
                    variant="contained"
                    style={{ textTransform: "none" }}
                    type="submit"
                    disabled={loading}
                  >
                    Next
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
