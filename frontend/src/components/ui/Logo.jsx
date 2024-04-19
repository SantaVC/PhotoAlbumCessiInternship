import { Link as RouterLink } from "react-router-dom";
import { Button } from "@mui/material";

const Logo = ({ sx }) => {
  return (
    <Button component={RouterLink} to="/" sx={{ color: "white", ...sx }}>
      LOGO
    </Button>
  );
};

export default Logo;
