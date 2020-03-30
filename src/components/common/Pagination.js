/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const useStyles = makeStyles(theme => ({
    paginationBtn: {
      backgroundColor: '#0074D9',
      color: '#ffff',
      fontWeight: 'bolder',
      width: '60px',
      '&:focus': {
        backgroundColor: '#ffff',
        color: '#0074D9'
      }
		},
		active: {
			backgroundColor: '#ffff',
			color: '#0074D9'
		}
  }));
const classes = useStyles();
const theme = useTheme();
const pageNumbers = [];
// eslint-disable-next-line no-plusplus
for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
  pageNumbers.push(i);
}
return (
  <>
    <ButtonGroup className={classes.btnGroup}>
      {pageNumbers.map(number => (
        <Button
          key={number}
          onClick={() => paginate(number)}
          className={[classes.paginationBtn, (number == currentPage) && classes.active ]}
          id='btn'
          test-data='button'
        >
          {number}
        </Button>
      ))}
    </ButtonGroup>
  </>
);
};
export default Pagination;
