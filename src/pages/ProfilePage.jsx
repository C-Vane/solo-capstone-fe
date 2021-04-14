import { Button, Container, Divider, Grid, TextField, Paper, IconButton, FormControlLabel, Switch, Grow, CircularProgress, Snackbar } from "@material-ui/core";
import { Publish } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { ContainerMain, MainContainer } from "../Assets/StyledComponents";
import { mapDispatchToProps, mapStateToProps } from "../Assets/VideoCallFunctions";
import { putFunction } from "../functions/CRUDFunctions";

export const ProfilePage = ({ user, setUser }) => {
  const [edit, setEdit] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageInput, setImageInput] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [snackbar, setSnackBar] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setFirstName(user.firstname);
    setLastName(user.lastname);
    setEmail(user.email);
  }, [user]);
  const EditProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await putFunction("users/me", { firstname: firstName, lastname: lastName, email: email, img: imageUrl || user.img });
    if (response._id) {
      setUser(response);
      setSnackBar([true, "success", "Profile updated Successfully!"]);
      setTimeout(() => {
        setChangePassword(false);
        setEdit(false);
        setLoading(false);
        setFirstName(response.firstname);
        setLastName(response.lastname);
        setEmail(response.email);
        setImageUrl("");
      }, 2000);
    } else {
      console.log(response);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      setSnackBar([true, "secondary", "Something went wrong please try again later"]);
    }
  };
  const ChangePassword = async () => {
    const response = await putFunction("users/me/changePassword", { oldPassword, newPassword });
    if (response)
      setTimeout(() => {
        setChangePassword(false);
        setEdit(false);
        setLoading(false);
        setFirstName(response.firstname);
        setLastName(response.lastname);
        setEmail(response.email);
        setImageUrl("");
      }, 2000);
  };
  return (
    <MainContainer>
      {loading ? (
        <CircularProgress className='m-auto' />
      ) : (
        <>
          <Paper elevation={3}>
            <ContainerMain>
              <form autoComplete='on' onSubmit={EditProfile}>
                <Grid container alignItems='stretch'>
                  <Grid item sm={4}>
                    <div className='p-5 d-flex '>
                      <div ClassName='w-50 d-flex m-auto'>
                        <Image src={user.img} roundedCircle fluid />
                      </div>
                      <IconButton aria-label='change' className='align-self-end' onClick={() => setImageInput((value) => !value)}>
                        <Publish />
                      </IconButton>
                    </div>
                    <Grow in={edit}>
                      <TextField variant='outlined' type='url' autoComplete='url' size='small' value={imageUrl} label='Image URL' onChange={(e) => setImageUrl(e.target.value)} />
                    </Grow>
                  </Grid>
                  <Divider orientation='vertical' flexItem light='false' />
                  <Grid item sm={7}>
                    <div className='min-vh-50 px-4 pt-2 d-flex flex-column '>
                      <FormControlLabel control={<Switch checked={edit} onChange={() => setEdit((value) => !value)} name='edit' color='primary' />} label='Edit' className='ml-auto' />
                      <h4>PROFILE </h4>

                      <Grid container alignItems='stretch' sm spacing={3}>
                        <Grid item sm={4} className='text-right mr-sm-3 d- flex-column'>
                          <div className='py-3 font-weight-bold'>Name</div>
                          <div className='py-3 font-weight-bold'>Surname</div>
                          <div className='py-3 font-weight-bold'>Email</div>
                          <div className='py-3 font-weight-bold'>Password</div>
                        </Grid>
                        <Grid item xs={7} className=' d- flex-column'>
                          <div className={edit ? "py-2" : "py-3"}>
                            {edit ? <TextField variant='outlined' size='small' value={firstName} onChange={(e) => setFirstName(e.target.value)} required /> : user.firstname}
                          </div>
                          <div className={edit ? "py-2" : "py-3"}>
                            {edit ? <TextField variant='outlined' size='small' value={lastName} onChange={(e) => setLastName(e.target.value)} required /> : user.lastname}
                          </div>
                          <div className={edit ? "py-2" : "py-3"}>
                            {edit ? <TextField type='email' variant='outlined' size='small' value={email} onChange={(e) => setEmail(e.target.value)} required /> : user.email}
                          </div>
                          <Grow in={changePassword} mountOnEnter unmountOnExit>
                            <div>
                              <TextField
                                className='mb-3'
                                variant='outlined'
                                size='small'
                                type='password'
                                label='Old Password'
                                autoComplete='current-password'
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                              />
                              <TextField
                                variant='outlined'
                                size='small'
                                autoComplete='new-password'
                                type='password'
                                label=' New Password'
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                              />
                            </div>
                          </Grow>
                          <Button
                            className='my-3'
                            size='small'
                            color='primary'
                            onClick={changePassword ? () => ChangePassword : (e) => setChangePassword((v) => !v)}
                            disabled={changePassword ? oldPassword.length < 5 || newPassword.length < 5 : false}
                          >
                            {changePassword ? "Submit New Password" : "Change Password"}
                          </Button>
                        </Grid>
                        <Grow in={edit}>
                          <Button size='small' color='primary' variant='contained' className='ml-auto mr-5' type='submit'>
                            Submit
                          </Button>
                        </Grow>
                      </Grid>
                    </div>
                  </Grid>
                </Grid>
              </form>
            </ContainerMain>
          </Paper>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={snackbar[0]}
            autoHideDuration={5000}
            onClose={() => setSnackBar([])}
          >
            <Alert severity={snackbar[1]} onClose={() => setSnackBar([])}>
              {snackbar[2]}
            </Alert>
          </Snackbar>
        </>
      )}
    </MainContainer>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
