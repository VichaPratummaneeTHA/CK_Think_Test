import React from 'react'
import {Button, makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(0.5),
    padding: theme.spacing(0.5)
  },
  label: {
    textTransform: 'none'
  }
}));

const Buttons = ({
  text, size, color, type, variant, onClick
}) => {
  const classes = useStyles();
  return (
    <Button
      variant={variant || 'contained'}
      size={size || 'large'}
      color={color ||'primary'}
      onClick={onClick}
      type={type}
      classes={{root: classes.root, label: classes.label}}
    >
      {text}
    </Button>
  )
}

export default Buttons
