"use client";
import { Dispatch, GlopalStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { loginSchema } from "@/features/loginSchema";
import { loginUser } from "@/features/login";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function LoginPage() {
  const dispatch = useDispatch<Dispatch>();
  const router = useRouter();
  const { error, loading } = useSelector((state: GlopalStore) => state.login);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const res = await dispatch(loginUser(values));
      if (loginUser.fulfilled.match(res)) {
        router.push("/");
      }
    },
  });
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          width: 350,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 3,
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <Typography variant="h5">Login</Typography>

        {/* demo account */}
        <Box
          sx={{
            bgcolor: "background.default",
            p: 2,
            borderRadius: 2,
            border: "1px dashed",
            borderColor: "divider",
          }}
        >
          <Typography fontWeight={600}>Demo Account</Typography>

          <Typography fontSize={13}>
            Username: <b>emilys</b>
          </Typography>

          <Typography fontSize={13}>
            Password: <b>emilyspass</b>
          </Typography>
        </Box>

        <TextField
          label="Username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={!!formik.errors.username}
          helperText={formik.errors.username}
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={!!formik.errors.password}
          helperText={formik.errors.password}
        />

        {error && <Typography color="error">{error}</Typography>}

        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? "Loading in..." : "Login"}
        </Button>
        {/* demo account fill form */}
        <Button
          variant="outlined"
          onClick={() =>
            formik.setValues({
              username: "emilys",
              password: "emilyspass",
            })
          }
        >
          Use Demo Account
        </Button>
      </Box>
    </Box>
  );
}
