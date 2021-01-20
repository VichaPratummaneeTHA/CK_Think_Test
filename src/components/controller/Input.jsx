import React from 'react'
import {TextField} from '@material-ui/core'

const Input = ({
  name, label, value, type, error = null, onChange
}) => {
  return (
    <TextField 
    name={name}
    variant='outlined'
    label={label}
    value={value}
    type={type}
    onChange={onChange}
    {...(error && {error:true, helperText:error})}
  />
  )
}

export default Input
