import React from "react";
import { Box, Pagination } from "@mui/material";

interface PaginationControlsProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={(_, value) => onPageChange(value)}
        color="primary"
      />
    </Box>
  );
};

export default PaginationControls;
