import React, { useEffect } from "react";
import SideMenu from "../dashboard/components/SideMenu";
import AppTheme from "../shared-theme/AppTheme";
import CssBaseline from "@mui/material/CssBaseline";
import AppNavbar from "../dashboard/components/AppNavbar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Header from "../dashboard/components/Header";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

export default function Profile(props: { disableCustomTheme?: boolean }) {
  const userData = Cookies.get("user_data")
    ? JSON.parse(Cookies.get("user_data"))
    : "";

  const [name, setName] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (nameError) {
      return;
    }

    setSuccessMessage("");

    try {
      const token = Cookies.get("auth_token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/name`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
      }
    } catch (err) {
      console.error("Change name error:", err);
    }
  };

  const validateInputs = () => {
    const name = document.getElementById("name") as HTMLInputElement;

    let isValid = true;

    if (!name.value) {
      setNameError(true);
      setNameErrorMessage("Name is required");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    return isValid;
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenu />
        <AppNavbar />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: "auto",
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
              {/* cards */}
              <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                Profile
              </Typography>
              <Grid
                container
                spacing={2}
                columns={12}
                sx={{ mb: (theme) => theme.spacing(2) }}
              >
                <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
                  <Card sx={{ height: "100%" }}>
                    <CardContent>
                      {/* <Typography
                        component="h2"
                        variant="subtitle2"
                        gutterBottom
                      >
                        Signed Up User
                      </Typography> */}
                      <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                          gap: 2,
                        }}
                      >
                        <FormControl>
                          <FormLabel htmlFor="email">Name</FormLabel>
                          <TextField
                            error={nameError}
                            helperText={nameErrorMessage}
                            id="name"
                            type="name"
                            name="name"
                            defaultValue={userData.name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            fullWidth
                            variant="outlined"
                            color={nameError ? "error" : "primary"}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel htmlFor="email">Email</FormLabel>
                          <TextField
                            // error={emailError}
                            // helperText={emailErrorMessage}
                            id="email"
                            type="email"
                            name="email"
                            defaultValue={userData.name}
                            slotProps={{
                              input: {
                                readOnly: true,
                              },
                            }}
                            required
                            fullWidth
                            variant="outlined"
                            // color={emailError ? "error" : "primary"}
                          />
                        </FormControl>
                        {successMessage && <p>{successMessage}</p>}
                        <Button
                          type="submit"
                          variant="contained"
                          onClick={validateInputs}
                        >
                          Save
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
