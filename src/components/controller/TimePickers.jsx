import React from 'react'
import {MuiPickersUtilsProvider, KeyboardTimePicker} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

const TimePickers = ({
  name, label, value, onChange
}) => {

  const covertToDefEventPara = (name, value) => ({
    target: {name, value}
  })
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardTimePicker 
        name = {name}
        label = {label}
        value = {value}
        onChange = {date => onChange(covertToDefEventPara(name, date))}
      />
    </MuiPickersUtilsProvider>
  )
}

export default TimePickers
