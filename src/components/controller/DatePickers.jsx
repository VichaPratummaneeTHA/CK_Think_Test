import React from 'react'
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

const DatePickers = ({
  name, label, value, onChange
}) => {

  const covertToDefEventPara = (name, value) => ({
    target: {name, value}
  })

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker 
        name = {name}
        label = {label}
        value = {value}
        format = 'dd/MM/yyyy'
        onChange = {date => onChange(covertToDefEventPara(name, date))}
      />
    </MuiPickersUtilsProvider>
  )
}

export default DatePickers
