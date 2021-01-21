import React, {Fragment, useState} from 'react'
import {makeStyles, Paper, TableBody, TableRow, TableCell, Toolbar} from '@material-ui/core'
import {People, AddCircle, EditOutlined, Close} from '@material-ui/icons';

//Components
import PageHeader from '../PageHeader'
import EmployeeForm from './EmployeeForm'
import Input from '../../components/controller/Input'
import Buttons from '../../components/controller/Buttons'
import ActionButtons from '../../components/controller/ActionButtons'
import Popup from '../../components/controller/Popup'
import Notifications from '../../components/controller/Notifications'
import ConfirmDialog from '../../components/controller/ConfirmDialog'
import UseTable from '../../components/UseTable'

import * as EmpolyeeServices from '../controller/services/EmpolyeeServices'


const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: '80%'
  },
  addNewButton: {
    position: 'absolute',
    right: '20px',
    padding: theme.spacing(1)
  }
}));

const headCells = [
  {id: 'fullname', label: 'Employee Name'},
  {id: 'email', label: 'Email Address (Personal)'},
  {id: 'mobile', label: 'Mobile Number'},
  {id: 'departmentId', label: 'Department'},
  {id: 'actions', label: 'Actions', disableSorting: true}
]

//Default Componet

const Employees = () => {

  const classes = useStyles();

  const dataEmployess = EmpolyeeServices.getAllEmployees()
  const [records, setRecords] = useState(dataEmployess);
  const [filterFunction, setFilterFunction] = useState({
    fn: items => {return items}
  })
  const [recordForEdit, setRecordForEdit] = useState(null) 
  const [openPopUp, setOpenPopup] = useState(false)
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: ''
  })
  const [ confirmDialog, setConfirmDialog] = useState({
    title: '',
    subTitle: '',
    isOpen: false
  })
  const {TblContainer, TblHead, TblPagination, recordAfterPagingAndSorting} = UseTable(records, headCells, filterFunction);

  const handleSearch = (event) => {
    let target = event.target
    setFilterFunction({
      fn: items => {
          if(target.value === ""){
            return items
          }else{
            return items.filter(item => item.fullName.toLowerCase().includes(target.value))
          }
        }  
    })
  }

  const addOrEdit = (employee, resetForm) => {

    if(employee.id === 0){
      EmpolyeeServices.insertEmployee(employee);
    }else{
      EmpolyeeServices.updateEmployee(employee);
    }
    
    setRecordForEdit(null)
    resetForm();
    setOpenPopup(false);
    setRecords(EmpolyeeServices.getAllEmployees());
    setNotify({
      isOpen: true,
      message: 'Submit Successfully',
      type: 'success'
    })
  }

  const openInPopup = (record) => {
    setRecordForEdit(record);
    setOpenPopup(true)
  }

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })
    EmpolyeeServices.deleteEmployee(id)
    setRecords(EmpolyeeServices.getAllEmployees());
    setNotify({
      isOpen: true,
      message: 'Deleted Successfully',
      type: 'error'
    })
  }
  return (
    <Fragment>
      <PageHeader 
          title = 'Header Test'
          subTitle = 'Sub HeaderTest'
          icon = {<People fontSize='large'/>}
        />
      <Paper className={classes.pageContent}>
        <Toolbar>
            <Input 
              label='Search Employees'
              className={classes.searchInput}
              onChange={handleSearch}
            />
            <Buttons 
              text='Add New'
              variant='outlined'
              startIcon={<AddCircle />}
              className={classes.addNewButton}
              onClick={() => {setOpenPopup(!openPopUp); setRecordForEdit(null);}}
            />

        </Toolbar>
        <TblContainer>  
          <TblHead />
          <TableBody>
            {
              recordAfterPagingAndSorting().map(record => (
                <TableRow key={record.id}>
                  <TableCell>{record.fullName}</TableCell>
                  <TableCell>{record.email}</TableCell>
                  <TableCell>{record.mobile}</TableCell>
                  <TableCell>{record.department}</TableCell>
                  <TableCell>
                    <ActionButtons 
                    color='primary' 
                    onClick={() => openInPopup(record)}>
                      <EditOutlined fontSize='small'/>
                    </ActionButtons>

                    <ActionButtons 
                    color='secondary' 
                    onClick={() => setConfirmDialog({
                      title: 'Are You Sure To Delete This Record',
                      subTitle: 'this cannot permenent',
                      isOpen: true,
                      //callback
                      onConfirm: () => {onDelete(record.id)}
                    }) }
                    >
                      <Close fontSize='small'/>
                    </ActionButtons>
                  </TableCell>        
                </TableRow>
              ))
            }
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper> 

       <Popup
       title = 'Employee Form'    
       open = {openPopUp}
       setOpenPopup ={setOpenPopup} >
        <EmployeeForm 
          recordForEdit={recordForEdit}
          addOrEdit={addOrEdit}
        />
       </Popup> 
       <Notifications 
         notify = {notify}
         setNotify = {setNotify}
       />
       <ConfirmDialog 
        confirmDialog = {confirmDialog}
        setConfirmDialog= {setConfirmDialog}/>      
    </Fragment>
  )
}

export default Employees
