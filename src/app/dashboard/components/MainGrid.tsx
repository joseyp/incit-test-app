import * as React from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Copyright from "../internals/components/Copyright";
import CustomizedDataGrid from "./CustomizedDataGrid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";

export default function MainGrid() {
  const [formData, setFormData] = React.useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = React.useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = React.useState("");

  const validateForm = () => {
    const newErrors: any = {};
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!formData.currentPassword) {
      newErrors.password = "Password is required.";
    }

    if (!passwordPattern.test(formData.newPassword)) {
      newErrors.newPassword =
        "Password must contain at least one uppercase, one lowercase, one digit, one special character, and be at least 8 characters long.";
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords must match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: any = {};

    if (validateForm()) {
      try {
        const token = Cookies.get("auth_token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/reset-password`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          }
        );

        if (!response.ok) {
          throw new Error(await response.text());
        }

        const data = await response.json();

        setMessage(data.message);
      } catch (err) {
        if (err instanceof Error) {
          newErrors.message =
            err.message || "Something went wrong. Please try again";
        } else {
          newErrors.message = "Something went wrong. Please try again";
        }
        const messageJSON = JSON.parse(newErrors.message);
        setMessage(messageJSON.error);
      }
    }
  };

  return (
    <Grid
      container
      sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}
      spacing={4}
    >
      {/* cards */}
      <Box sx={{ width: "60%" }}>
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          Overview
        </Typography>
        <Grid
          container
          spacing={2}
          columns={12}
          sx={{ mb: (theme) => theme.spacing(2) }}
        >
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography component="h2" variant="subtitle2" gutterBottom>
                  Signed Up User
                </Typography>
                <Typography variant="h4" component="p">
                  120
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  All time
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography component="h2" variant="subtitle2" gutterBottom>
                  Active User
                </Typography>
                <Typography variant="h4" component="p">
                  25
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Today
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography component="h2" variant="subtitle2" gutterBottom>
                  Avg. Active User
                </Typography>
                <Typography variant="h4" component="p">
                  120
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Last 7 days
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          User Dashboard
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, lg: 12 }}>
            <CustomizedDataGrid />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ width: "30%" }}>
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          Reset Password
        </Typography>
        <Grid
          container
          spacing={2}
          columns={12}
          sx={{ mb: (theme) => theme.spacing(2) }}
        >
          <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Box
                  component="form"
                  onSubmit={onSubmit}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    gap: 2,
                  }}
                >
                  <FormControl>
                    <FormLabel htmlFor="currentPassword">
                      Current Password
                    </FormLabel>
                    <TextField
                      id="currentPassword"
                      type="password"
                      name="currentPassword"
                      required
                      fullWidth
                      variant="outlined"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          currentPassword: e.target.value,
                        })
                      }
                      helperText={errors.currentPassword}
                      error={!!errors.currentPassword}
                      // color={emailError ? "error" : "primary"}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="newPassword">New Password</FormLabel>
                    <TextField
                      id="newPassword"
                      type="password"
                      name="newPassword"
                      required
                      fullWidth
                      variant="outlined"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          newPassword: e.target.value,
                        })
                      }
                      helperText={errors.newPassword}
                      error={!!errors.newPassword}
                      // color={emailError ? "error" : "primary"}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="confirmPassword">
                      Password Confirmation
                    </FormLabel>
                    <TextField
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      required
                      fullWidth
                      variant="outlined"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      helperText={errors.confirmPassword}
                      error={!!errors.confirmPassword}
                      // color={emailError ? "error" : "primary"}
                    />
                  </FormControl>
                  {message && <p>{message}</p>}
                  <Button
                    type="submit"
                    variant="contained"
                    // onClick={validateInputs}
                  >
                    Save
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Copyright sx={{ my: 4, width: "100%" }} />
    </Grid>
  );
}
