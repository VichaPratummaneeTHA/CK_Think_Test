import React from 'react'
import {FormControl, FormLabel , RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
const RadioGroups = ({
  name, value, onChange, items
}) => {
  return (
    <FormControl>
            <FormLabel>Gender</FormLabel>
            <RadioGroup 
              row
              name={name}
              value={value}
              onChange={onChange}
              >
              {
                items.map((item, index) => (
              <FormControlLabel 
                key={index}  
                control={<Radio />}
                label={item.title}
                value={item.id}
              />
                ))
              }
            </RadioGroup>
    </FormControl>
  )
}

export default RadioGroups
