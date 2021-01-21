import React, {useState} from 'react'
import {makeStyles, Table, TableHead, TableRow ,TableCell , TablePagination, TableSortLabel} from '@material-ui/core'

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

/* Default Component*/
const UseTable = (records, headCells, filterFunction) => {

  const classes = useStyles();

  const pages = [5, 10, 25];
  const [rowsPerPage, setRowsPerPage] = useState(pages[0])
  const [page, setPage] = useState(0)

  const [order, setOrder] = useState() // asc || dsc
  const [orderBy, setOrderBy] = useState() // headCell.id

  const TblContainer = ({
    children
  }) => (
    <Table className={classes.table}>
      {children}
    </Table>
  )

  const TblHead = (props) => {

    const handleSortRequest = (cellId) => {
        const idAsc = orderBy === cellId && order === 'asc'  // true || false
        setOrder(idAsc ? ('desc') : ('asc'))
        setOrderBy(cellId)
    }

    return(
      <TableHead>
          <TableRow>
          {
            headCells.map(headcell => (
               <TableCell 
                key={headcell.id}
                sortDirection={orderBy === headcell.id ? (order) : (false)}
                >
               <TableSortLabel
                  active={orderBy === headcell.id}
                  direction={orderBy === headcell.id ? (order) : ('asc')}
                  onClick = {() => handleSortRequest(headcell.id)}
               >
                  {headcell.label}
               </TableSortLabel>       
               </TableCell> 
            ))
          }
          </TableRow>
      </TableHead>
    )
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    // console.log(page, 'got click handleChangePage')
  }

  const handleChangeRowsPerPage = event => {
    // console.log(event.target.value)
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0);
    // console.log(rowsPerPage, 'got click handleChangeRowsPerPage')

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

  const stableSort = (arr, comparator) => {
    const stabilizedThis = arr.map((a, index) => [a, index])
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if(order !== 0) return order;
      return a[1] - b[1];
    })

    return stabilizedThis.map((a) => a[0]);
  }

  const getComparator = (order, orderBy) => {
    return order === 'desc'
    ?(a, b) => descendingComparator(a, b, orderBy)
    :(a, b) => -descendingComparator(a, b, orderBy)
  }

  const descendingComparator = (a, b, orderBy) => {
    if(b[orderBy] < a[orderBy]){
      return -1
    }
    if(b[orderBy] > a[orderBy]){
      return 1
    }
      return 0
  }

  const recordAfterPagingAndSorting = () => {

    return stableSort(filterFunction.fn(records), getComparator(order, orderBy)).slice(page*rowsPerPage, (page+1)*rowsPerPage)
  }
    
  return {TblContainer, TblHead, TblPagination, recordAfterPagingAndSorting}
}

export default UseTable

 