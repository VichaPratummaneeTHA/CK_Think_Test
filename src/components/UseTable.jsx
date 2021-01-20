import React, {useState} from 'react'
import {makeStyles, Table, TableHead, TableRow ,TableCell , TablePagination} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  table: {
    marginTop: theme.spacing(3),
    '& thead th': {
      fontWeight: '600',
      color: theme.palette.secondary.main,
      backgroundColor: theme.palette.primary.main,
    },
    '& tbody td': {
      fontWeight: '300',
    },
    '& tbody tr:hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointer'
    }
  }
}))

const UseTable = (records, headCells) => {

  const classes = useStyles();

  const pages = [5, 10, 15];
  const [rowsPerPage, setRowsPerPage] = useState(pages[0])
  const [page, setPage] = useState(0)

  const TblContainer = ({
    children
  }) => (
    <Table className={classes.table}>
      {children}
    </Table>
  )

  const TblHead = (props) => {
    return(
      <TableHead>
          <TableRow>
          {
            headCells.map(headcell => (
               <TableCell key={headcell.id}>
                  {headcell.label}
               </TableCell> 
            ))
          }
          </TableRow>
      </TableHead>
    )
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log('got click handleChangePage')
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0);
    console.log('got click handleChangeRowsPerPage')

  }

  const TblPagination = (props) => {
    return(
        <TablePagination 
          component='div'
          rowsPerPageOptions={pages}
          rowsPerPage={rowsPerPage}
          page={page}
          count={records.length}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    )
  }
    
  return {TblContainer, TblHead, TblPagination}
}

export default UseTable
