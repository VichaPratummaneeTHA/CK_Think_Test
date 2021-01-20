import React, {Fragment, useState} from 'react'
import {makeStyles, Paper, TableBody, TableRow, TableCell } from '@material-ui/core'
import {People} from '@material-ui/icons';

//Components
import PageHeader from '../PageHeader'
import EmployeeForm from './EmployeeForm'
import UseTable from '../../components/UseTable'

import * as EmpolyeeServices from '../controller/services/EmpolyeeServices'

const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  }
}));

const headCells = [
  {id: 'fullname', label: 'Employee Name'},
  {id: 'email', label: 'Email Address (Personal)'},
  {id: 'mobile', label: 'Mobile Number'},
  {id: 'departmentId', label: 'Department'}
]

const Employees = () => {

  const classes = useStyles();

  const dataEmployess = EmpolyeeServices.getAllEmployees()
  const [records] = useState(dataEmployess);
  const {TblContainer, TblHead, TblPagination} = UseTable(records, headCells);

  return (
    <Fragment>
      <PageHeader 
          title = 'Header Test'
          subTitle = 'Sub HeaderTest'
          icon = {<People fontSize='large'/>}
        />
      <Paper className={classes.pageContent}>
        <EmployeeForm />
        <TblContainer>
          <TblHead />
          <TableBody>
            {
              records.map(record => (
                <TableRow key={record.id}>
                  <TableCell>{record.fullName}</TableCell>
                  <TableCell>{record.email}</TableCell>
                  <TableCell>{record.mobile}</TableCell>
                  <TableCell>{record.department}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>  
    </Fragment>
  )
}

export default Employees
