import { Paper } from "@mui/material";

const Section = ({ sx, children }) => {
  return (
    <Paper elevation={3} sx={{ my: 4, p: 3, ...sx }} component="section">
      {children}
    </Paper>
  );
};

export default Section;
