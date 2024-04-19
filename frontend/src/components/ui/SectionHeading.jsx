import { Typography } from "@mui/material";

const SectionHeading = ({ children }) => {
  return (
    <Typography variant="h4" component="h1" textAlign="center">
      {children}
    </Typography>
  );
};

export default SectionHeading;
