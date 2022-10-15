import styled from "@emotion/styled";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { MyAvatar } from "../../components/MyAvatar";
import { Edit, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";

export const Settings = () => {
  const [disabled, setDisabled] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [open, setOpen] = React.useState(false);
  const user = useSelector((e) => e.LoggedInUser);
  useEffect(() => {
    document.title = "Profile - TechTube";
  }, []);
  const handleClickShowPassword = () => {
    setShowPass(!showPass);
  };

  useEffect(() => {
    if (user) {
      console.log(user);
      formik.setValues(user);
    }
  }, [user]);

  const formik = useFormik({
    initialValues: {
      f_name: "",
      l_name: "",
      email: "",
      password: "",
    },
  });

  const deleteAccount = () => {
    console.log("deleted");
    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="container">
        {user ? (
          <>
            <div className="row">
              <div className="col-12">
                {/* <Paper elevation={12} style={{ padding: "12px" }}> */}
                <h4 className="mb-4">Profile Info</h4>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          Profile Picture
                        </TableCell>
                        {/* <TableCell></TableCell> */}
                        <TableCell>
                          <div
                            style={{ display: "flex", justifyContent: "end" }}
                          >
                            <MyAvatar
                              channel={`${user.f_name} ${user.l_name}`}
                              height="60px"
                              width="60px"
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          First Name
                        </TableCell>
                        <TableCell>
                          <TextField
                            id="f_name"
                            name="f_name"
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            disabled={disabled}
                            value={formik.values.f_name}
                            onChange={formik.handleChange}
                          />
                        </TableCell>
                        {/* <TableCell align="center">
                        <IconButton aria-label="delete">
                          <Edit />
                        </IconButton>
                      </TableCell> */}
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          Last Name
                        </TableCell>
                        <TableCell>
                          <TextField
                            id="l_name"
                            name="l_name"
                            value={formik.values.l_name}
                            onChange={formik.handleChange}
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            disabled={disabled}
                          />
                        </TableCell>
                        {/* <TableCell align="center">
                        <IconButton aria-label="edit  ">
                          <Edit />
                        </IconButton>
                      </TableCell> */}
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          Email
                        </TableCell>
                        <TableCell>
                          <TextField
                            id="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            label="Email"
                            variant="outlined"
                            fullWidth
                            disabled={disabled}
                          />
                        </TableCell>
                        {/* <TableCell align="center"></TableCell> */}
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          Password
                        </TableCell>
                        <TableCell>
                          <FormControl
                            fullWidth
                            variant="outlined"
                            disabled={disabled}
                          >
                            <InputLabel htmlFor="outlined-adornment-password">
                              Password
                            </InputLabel>
                            <OutlinedInput
                              id="password"
                              name="password"
                              value={formik.values.password}
                              onChange={formik.handleChange}
                              type={showPass ? "text" : "password"}
                              // value={values.password}
                              // onChange={handleChange("password")}
                              endAdornment={
                                !disabled ? (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleClickShowPassword();
                                      }}
                                      edge="end"
                                    >
                                      {showPass ? (
                                        <VisibilityOff />
                                      ) : (
                                        <Visibility />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ) : (
                                  <></>
                                )
                              }
                              label="Password"
                            />
                          </FormControl>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <div className="d-flex justify-content-end mt-3">
                  <Button
                    variant="contained"
                    color="error"
                    style={{ marginRight: "10px" }}
                    onClick={handleClickOpen}
                  >
                    Delete Account
                  </Button>
                  {disabled ? (
                    <Button
                      variant="contained"
                      onClick={() => {
                        setDisabled(!disabled);
                      }}
                    >
                      Edit Info
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => {
                        setDisabled(!disabled);
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
                {/* </Paper> */}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Account?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure, you want ot delete your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button color="error" onClick={deleteAccount}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
