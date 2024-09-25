import React from 'react';
import { Pagination } from '@mui/material';
import './AppPagination.css';

const AppPagination = ({ metadata, onPageChange }) => {
  console.log("apppag --  ", metadata);
  const { currentPage, totalPages } = metadata;

  return (
    <Pagination
      classes={{ ul: 'custom-pagination' }} // Assign custom CSS class
      size="large"
      count={totalPages}
      page={currentPage}
      onChange={(e, page) => onPageChange(page)}
    />
  );
};

export default AppPagination;
