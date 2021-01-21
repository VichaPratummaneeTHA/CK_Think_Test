import React from 'react'
import {TextField} from '@material-ui/core'

const Input = ({
  name, label, value, type, error = null, onChange, ...other
}) => {
  return (
    <TextField 
    name={name}
    variant='outlined'
    label={label}
    value={value}
    type={type}
    onChange={onChange}
    {...other}
    {...(error && {error:true, helperText:error})}
  />
  )
}

export default Input
