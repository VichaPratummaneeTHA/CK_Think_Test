import React from 'react'
import {Button, makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root:{
    minWidth: 0,
    margin: theme.spacing(0.5),
  },

  secondary:{
    backgroundColor: theme.palette.secondary.light,
    '& .MuiButton-label': {
      color: theme.palette.secondary.main,
    }
  },
  primary:{
    backgroundColor: theme.palette.primary.light,
    '& .MuiButton-label': {
      color: theme.palette.primary.main,
    },
  },
}))

const ActionButtons = ({
  color, children, onClick
}) => {
  const classes = useStyles();
  return (
    <Button onClick={onClick} className={`${classes.root} ${classes[color]}`}>
      {children}
    </Button>
  )
}

export default ActionButtons
