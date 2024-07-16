import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import FTextField from "../components/form/FTextField";
import FormProvider from "../components/form/FormProvider";
import {
  Alert,
  Container,
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FCheckbox from "../components/form/FCheckbox";
import { LoadingButton } from "@mui/lab";
import Link from "@mui/material/Link";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

const loginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const defaultValues = {
  username: "",
  password: "",
  remember: true,
};
function LoginPage() {
  const auth = useAuth();
  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassWord, setshowPassWord] = useState(false);

  const handleCheckContract = () => {
    navigate("/check");
  };

  const onSubmit = async (data) => {
    //receive the location from AuthRequire
    const from = location.state?.from?.pathname || "/";
    let { username, password } = data;
    try {
      await auth.login({ username, password }, () => {
        navigate(from, { replace: true }); //navigate to exact location received above
      });
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Card sx={{ mb: 3 }}>
        <CardActionArea>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              color="primary"
              component="div"
            >
              Check Contract info
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Customer check Contract info without login
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={handleCheckContract}>
            Check Contract
          </Button>
        </CardActions>
      </Card>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.responseError && (
            <Alert severity="error">{errors.responseError.message}</Alert>
          )}

          <FTextField name="username" label="Usernname" />
          <FTextField
            name="password"
            type={showPassWord ? "text" : "password"}
            label="Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setshowPassWord((pre) => !pre)}
                  >
                    {showPassWord ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <FCheckbox name="remember" label="Remember me" />
        </Stack>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </FormProvider>
    </Container>
  );
}

export default LoginPage;
