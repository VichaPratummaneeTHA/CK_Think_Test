import React, {useEffect} from 'react'
import {Grid, makeStyles} from '@material-ui/core'

//Componet
import {UseForm, Form } from '../UseForm'

//Controller
import Input from '../controller/Input'
import RadioGroups from '../controller/RadioGroups'
import SelectDropDown from '../controller/SelectDropDown'
import CheckBoxs from '../controller/CheckBoxs'
import DatePickers from '../controller/DatePickers'
import Buttons  from '../controller/Buttons'
import TimePickers  from '../controller/TimePickers'
import * as EmpolyeeServices from '../controller/services/EmpolyeeServices'

const initalValues = {
  id:0,
  fullName: '',
  email: '',
  mobile: '',
  city: '',
  gender: '',
  departmentId: '',
  hireDate: new Date(),
  time: new Date(),
  isPermanent: false
}

/* From Radion Button*/
const genderItems = [
  {id: 'male', title: 'Male'},
  {id: 'female', title: 'Female'},
  {id: 'other', title: 'Other'}
]

const useStyles = makeStyles(theme => ({
  boxDateTime: {
    padding: theme.spacing(1),
    display: 'flex',
    marginBottom: theme.spacing(2)
  }
}));

/* Default Component */
const EmployeeForm = ({
  addOrEdit, recordForEdit
}) => {

  const classes = useStyles();

  const validate = (fieldValues = values) => {
  
    let tempInput = {...errors};
    if('fullName' in fieldValues) tempInput.fullName = fieldValues.fullName ? "" : 'This Field is required'
    if('email' in fieldValues) tempInput.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : 'Email is not valid'
    if('mobile' in fieldValues) tempInput.mobile = fieldValues.mobile.length === 10 ? "" : "Moblie required 10 number"
    if('departmentId' in fieldValues)  tempInput.departmentId = fieldValues.departmentId.length !== 0 ? "" : "This Field is required"
    setErrors({
      ...tempInput
    })
    if(fieldValues === values)
    return Object.values(tempInput).every(x => x === "");
  }

  const {values, setValues, errors, setErrors, handleInputChange, resetForm} = UseForm(initalValues, true, validate);

  const handleSubmit = (event) => {
    if(validate()){
      // window.alert('Completed Submit ...')
      // EmpolyeeServices.insertEmployee(values);
      // resetForm();
      addOrEdit(values, resetForm)
    }
    event.preventDefault();
  }

  useEffect(() => { if(recordForEdit !== null) setValues({...recordForEdit})}, [setValues, recordForEdit])

  return (
    <Form onSubmit={event => handleSubmit(event)}>
      <Grid container>
        <Grid item xs={6}>
          <Input 
            name='fullName'
            variant='outlined'
            label='Full Name'
            value={values.fullName}
            type='text'
            onChange={handleInputChange}
            error = {errors.fullName}
          /> 
          <Input
            name= 'email' 
            variant='outlined'
            label='Email'
            value={values.email}
            type='text'
            onChange={handleInputChange}
            error = {errors.email}

          />
          <Input
            name= 'mobile' 
            variant='outlined'
            label='Mobile'
            value={values.mobile}
            type='text'
            onChange={handleInputChange}
            error = {errors.mobile}

          />
          <Input
            name= 'city' 
            variant='outlined'
            label='City'
            value={values.city}
            type='text'
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
            <RadioGroups 
              name = 'gender'
              value = {values.gender || ''}
              onChange ={handleInputChange}
              items = {genderItems}
            />
            <SelectDropDown 
              name = 'departmentId'
              label = 'Department'
              value = {values.departmentId || ''}
              onChange = {handleInputChange}
              options = {EmpolyeeServices.getDepartmentCollection()}
              error = {errors.departmentId}

            />
            <CheckBoxs 
              name = 'isPermanent'
              label = 'Perment Employee'
              value = {values.isPermanent}
              onChange = {handleInputChange}
            />
            <div className={classes.boxDateTime}>
            <DatePickers 
              name = 'hireDate'
              label = 'Hire Date'
              value = {values.hireDate} 
              onChange = {handleInputChange}
            />
            <TimePickers 
              name = 'time'
              label = 'Check Time-Out'
              value = {values.time}
              onChange = {handleInputChange}
            />
            </div>
           
            <div>
              <Buttons 
                text = 'Submit'
                type = 'submit'
              />
              <Buttons 
                color = 'secondary'
                text = 'Reset'
                type = 'button'
                onClick={resetForm}
              />
            </div>
        </Grid>

      </Grid>
    </Form>
  )
}

export default EmployeeForm
