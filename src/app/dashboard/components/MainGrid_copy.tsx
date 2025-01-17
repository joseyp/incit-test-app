import * as React from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Copyright from "../internals/components/Copyright";
import CustomizedDataGrid from "./CustomizedDataGrid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default function MainGrid() {
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
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
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
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
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
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
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <CustomizedDataGrid />
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
