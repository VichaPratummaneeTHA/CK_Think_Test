import React from 'react'
import {FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@material-ui/core'

const SelectDropDown = ({
  name, label, value, onChange, options, error = null
}) => {
  return (
    <FormControl variant='outlined' {...(error && {error:true})}>
      <InputLabel>{label}</InputLabel>
      <Select 
        labal = {label}
        name = {name}
        value = {value}
        onChange = {onChange}
      >
      <MenuItem disabled value="">
           none
      </MenuItem>
          {
            options.map((opt, index) => (
              <MenuItem key={index} value={opt.id}>{opt.title}</MenuItem>
            ))
          }
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}

export default SelectDropDown
