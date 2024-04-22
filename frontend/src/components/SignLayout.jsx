import { Link as RouterLink } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Grid, Paper, Link, Stack, Box } from "@mui/material";
import ToggleTheme from "../components/ToggleTheme";

const SignLayout = ({ children }) => {
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          my={2}
          mx={4}
        >
          <Link display="flex" component={RouterLink} to="/">
            <Box mr={1}>
              <ArrowBackIcon />
            </Box>
            Go to home page
          </Link>
          <ToggleTheme />
        </Stack>
        {children}
      </Grid>
    </Grid>
  );
};

export default SignLayout;
