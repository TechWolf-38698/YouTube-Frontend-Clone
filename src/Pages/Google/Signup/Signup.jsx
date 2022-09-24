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
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../../Services/myAxios";

const validationSchema = yup.object({
  f_name: yup.string("Enter your first name").required("Enter your first name"),
  l_name: yup.string("Enter your last name").required("Enter your last name"),
  email: yup
    .string("Enter an email")
    .email("Enter a valid email")
    .required("Enter an email"),
  password: yup
    .string("Enter a password")
    .required("Enter a password")
    .min(8, "Password must be at least 8 characters"),
  cPassword: yup
    .string("Enter a password")
    .required("Enter a password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [axiosError, setAxiosError] = useState(undefined);

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      f_name: "",
      l_name: "",
      email: "",
      password: "",
      cPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios.post(`${baseUrl}/users/rigister`, values).then(
        function(response) {
          setAxiosError(undefined);
          setLoading(false);
          console.log(response);
          navigate("/google/signin");
        },
        (error) => {
          // console.log(error.response.data.msg);
          error.response.data
            ? setAxiosError(error.response.data.msg)
            : setAxiosError(undefined);
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
            className="text-start signin-form-body"
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
              <h1 className="signin-form-h1">Create your Account</h1>
              <div className="signin-form-subtitle">
                <span>for YouTube</span>
              </div>
              <form
                className="row justify-content-center align-items-center px-3 pt-4"
                style={{ width: "390px" }}
                onSubmit={formik.handleSubmit}
              >
                <div className="col-12 mb-3">
                  <div className="row pr-1">
                    <div className="col p-0 pr-1">
                      <TextField
                        id="f_name"
                        name="f_name"
                        label="First Name"
                        autoFocus
                        autoComplete="off"
                        spellCheck="false"
                        value={formik.values.f_name}
                        onChange={formik.handleChange}
                        variant="outlined"
                        fullWidth
                        size="small"
                        disabled={loading}
                        type="text"
                        error={
                          formik.touched.f_name && Boolean(formik.errors.f_name)
                        }
                        helperText={
                          formik.touched.f_name && formik.errors.f_name
                        }
                      />
                    </div>
                    <div className="col p-0">
                      <TextField
                        id="l_name"
                        name="l_name"
                        label="Last Name"
                        autoComplete="off"
                        spellCheck="false"
                        value={formik.values.l_name}
                        onChange={formik.handleChange}
                        variant="outlined"
                        fullWidth
                        size="small"
                        disabled={loading}
                        type="text"
                        error={
                          formik.touched.l_name && Boolean(formik.errors.l_name)
                        }
                        helperText={
                          formik.touched.l_name && formik.errors.l_name
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <div className="row">
                    <div className="col p-0 mr-1">
                      <TextField
                        id="email"
                        name="email"
                        label="Enter your email"
                        autoComplete="off"
                        spellCheck="false"
                        value={formik.values.email}
                        onChange={(e) => {
                          formik.setFieldValue(
                            "email",
                            e.target.value.toLowerCase()
                          );
                        }}
                        variant="outlined"
                        fullWidth
                        size="small"
                        disabled={loading}
                        type="text"
                        error={
                          (formik.touched.email &&
                            Boolean(formik.errors.email)) ||
                          Boolean(axiosError)
                        }
                        helperText={
                          (formik.touched.email && formik.errors.email) ||
                          axiosError
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="col-12 mb-3">
                  <div className="row">
                    <div className="col p-0 mr-1">
                      <FormControl
                        fullWidth
                        size="small"
                        variant="outlined"
                        error={
                          formik.touched.password &&
                          Boolean(formik.errors.password)
                        }
                      >
                        <InputLabel htmlFor="outlined-adornment-password">
                          Password
                        </InputLabel>
                        <OutlinedInput
                          disabled={loading}
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={formik.values.password}
                          onChange={formik.handleChange}
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
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Password"
                        />
                        <FormHelperText id="outlined-weight-helper-text">
                          {formik.touched.password && formik.errors.password}
                        </FormHelperText>
                      </FormControl>
                    </div>
                  </div>
                </div>

                <div className="col-12 mb-3">
                  <div className="row">
                    <div className="col p-0 mr-1">
                      <TextField
                        id="cPassword"
                        name="cPassword"
                        label="Confirm Password"
                        autoComplete="off"
                        spellCheck="false"
                        value={formik.values.cPassword}
                        onChange={formik.handleChange}
                        variant="outlined"
                        fullWidth
                        size="small"
                        disabled={loading}
                        type="password"
                        error={
                          formik.touched.cPassword &&
                          Boolean(formik.errors.cPassword)
                        }
                        helperText={
                          formik.touched.cPassword && formik.errors.cPassword
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="col-12 pr-0 pl-0 pt-5 mt-2 d-flex justify-content-between">
                  <Button
                    onClick={() => {
                      navigate("/google/signin");
                    }}
                    size="small"
                    style={{ textTransform: "none" }}
                    disabled={loading}
                  >
                    Signin Instead
                  </Button>
                  <Button
                    variant="contained"
                    style={{ textTransform: "none" }}
                    type="submit"
                    disabled={loading}
                  >
                    Create
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
