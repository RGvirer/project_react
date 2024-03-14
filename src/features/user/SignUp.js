import * as React from 'react';
import { Button, TextField, Link, Grid, Box, Typography, Container, InputAdornment, IconButton, InputLabel, FormControl, OutlinedInput } from '@mui/material';
import { signup as ApiSignUp, signin } from "./userApi";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { saveUser } from './userSlice';
import { useForm } from 'react-hook-form';
import CircularProgress from '@mui/material/CircularProgress';
import { Visibility, VisibilityOff } from "@mui/icons-material";


const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const response = await ApiSignUp(data.firstName, data.lastName,"123abc", data.email);
      // const response = await signin( data.email,data.password);
      dispatch(saveUser(response.data));
      alert("נרשמת בהצלחה");
      console.log(response?.data);
      navigate('/');
    } catch (error) {
      console.error(error);
      alert(error.response?.data);
    } finally {
      setIsSubmitting(false);
    }
  };
  // const onSubmit = async (data) => {
  //   try {
  //     setIsSubmitting(true);
  //     const response = await ApiSignUp(data.firstName, data.lastName, data.password, data.email);
  //     if (response && response.data) {

  //       dispatch(saveUser(response.data));
  //       alert("נכנסת בהצלחה");
  //       console.log(response.data);
  //       navigate('/');
  //     } else {
  //       console.error("Invalid response or missing data property");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     alert(error.response?.data || "An error occurred");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          הרשמה
        </Typography>
        <Typography>
          {":הזן שם, כתובת  דוא\"ל וסיסמה להרשמה"}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                disabled={isSubmitting}
                fullWidth
                id="firstName"
                label="שם פרטי"
                autoFocus
                {...register("firstName", { required: "שדה חובה" })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="שם משפחה"
                disabled={isSubmitting}
                name="lastName"
                autoComplete="family-name"
                {...register("lastName", { required: "שדה חובה" })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="אימייל"
                name="email"
                disabled={isSubmitting}
                autoComplete="email"
                {...register("email", { required: "שדה חובה" })}
              />
              {errors.email && <span style={{ color: "red" }}>{errors.email.message}</span>}
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">סיסמה</InputLabel>
                  <OutlinedInput
                    type={showPassword ? 'text' : 'password'}
                    {...register("password", { required: "שדה חובה" })}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="סיסמה"
                    style={{ marginBottom: "4%", marginTop: "4%", marginLeft: "-7px", width: "25vw" }}
                    disabled={isSubmitting}
                  />
                </FormControl>
              </Box>
              {errors.password && <span style={{ color: "red" }}>{errors.password.message}</span>}

            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            disabled={isSubmitting}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isSubmitting ? <CircularProgress /> : "הירשם"}
          </Button>
          <Link href="/signin" variant="body2">
            יש לך כבר חשבון? היכנס
          </Link>
        </form>
      </Box>
    </Container>
  );
}
export default SignUp;