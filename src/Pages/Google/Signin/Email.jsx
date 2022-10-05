import React from "react";
import { Box, Button, LinearProgress } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../../Services/myAxios";

const validationSchema = yup.object({
  email: yup
    .string("Enter an email")
    .email("Enter a valid email")
    .required("Enter an email"),
});

export const Email = () => {
  const [loading, setLoading] = useState(false);
  const [axiosError, setAxiosError] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    user ? navigate("password", { state: user }) : console.log("Enter Email");
  });

  const eformik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios
        .post(`${baseUrl}/users/finduser`, values)
        .then(function(response) {
          // console.log(response.data.email);
          setAxiosError(undefined);
          setLoading(false);
          setUser(response.data.email);
        })
        .catch(function(error) {
          setAxiosError(error.response.data.msg);
          setLoading(false);
        });
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
                onSubmit={eformik.handleSubmit}
              >
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  autoFocus
                  autoComplete="off"
                  value={eformik.values.email}
                  onChange={eformik.handleChange}
                  error={
                    (eformik.touched.email && Boolean(eformik.errors.email)) ||
                    Boolean(axiosError)
                  }
                  helperText={
                    (eformik.touched.email && eformik.errors.email) ||
                    axiosError
                  }
                  variant="outlined"
                  fullWidth
                  disabled={loading}
                />

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
                    onClick={() => navigate("/google/signup")}
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
