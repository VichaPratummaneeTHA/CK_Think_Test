import React from 'react'
import {FormControl, FormControlLabel, Checkbox} from '@material-ui/core'

const CheckBoxs = ({
  name, label, value, onChange
}) => {

  const covertToDefEventPara = (name, value) => ({
    target: {name, value}
  })
  
  return (
    <FormControl>
      <FormControlLabel 
        control = {
        <Checkbox 
        name={name}
        color='primary'
        checked={value}
        onChange = {(event) => onChange(covertToDefEventPara(name, event.target.checked))}
        />}
        label={label}
      />
    </FormControl>
  )
}

export default CheckBoxs
