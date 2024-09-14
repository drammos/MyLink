import React from 'react';
import { Pagination } from '@mui/material';

const AppPagination = ({ metadata, onPageChange }) => {
  console.log("apppag --  ", metadata)
  const { currentPage, totalPages } = metadata;
  
  return (
    <Pagination
      color="secondary"
      size="large"
      count={totalPages}
      page={currentPage}
      onChange={(e, page) => onPageChange(page)}
    />
  );
};

export default AppPagination;