import React from "react";
import { Box, Typography } from "@mui/material";

interface PageHeaderProps {
  logoSrc: string;
  heading: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ logoSrc, heading }) => (
  <Box display="flex" flexDirection="column" alignItems="center" mt={4} mb={4}>
    <img
      src={logoSrc}
      alt="Page Logo"
      style={{ width: "150px", marginBottom: "20px" }}
    />
    <Typography
      variant="h6"
      color="textSecondary"
      textAlign="center"
      gutterBottom
    >
      {heading}
    </Typography>
  </Box>
);

export default PageHeader;
