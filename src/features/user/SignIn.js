import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography, CssBaseline, Container, InputAdornment, IconButton, OutlinedInput, InputLabel, FormControl, Link, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { reloadUser, saveUser } from "./userSlice";
import { signin as ApiSignIn } from "./userApi";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

const SignIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        dispatch(reloadUser());
    }, [dispatch]);

    const onSubmit = async (data, e) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            const response = await ApiSignIn(data.email, data.password);
            dispatch(saveUser(response.data));
            alert("נכנסת בהצלחה");
            console.log(response.data);
            navigate('/');
        } catch (error) {
            console.error(error);
            alert(error.response.data);
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <>
            <Container>
                <Box sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Typography component="h1" variant="h5">
                        כניסה
                    </Typography>
                    <Typography component="h1">
                        {":הזן את כתובת הדוא\"ל והסיסמה לכניסה"}
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            variant="outlined"
                            label="אימייל"
                            style={{ marginBottom: "4%", marginTop: "4%", width: "25vw" }}
                            disabled={isSubmitting}
                            {...register("email", { required: "שדה חובה" })}
                        />
                        {errors.email && <span style={{ color: "red" }}>{errors.email.message}</span>}



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

                        <Button
                            style={{ marginBottom: "4%", marginTop: "4%", width: "25vw", padding: "15px" }}
                            disabled={isSubmitting}
                            fullWidth
                            variant="contained"
                            type="submit">
                            {isSubmitting ? <CircularProgress /> : "כניסה"}
                        </Button>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"אין לך חשבון? הרשמה"}
                            </Link>
                        </Grid>
                    </form>
                </Box>
            </Container>
        </>
    );
};

export default SignIn;