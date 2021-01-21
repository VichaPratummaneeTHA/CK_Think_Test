import React from 'react'
import {Snackbar, makeStyles} from '@material-ui/core'
import {Alert} from '@material-ui/lab'

const useStyles = makeStyles(theme => ({
  root: {
    top: theme.spacing(9)
  }
}))

const Notifications = ({
  notify, setNotify
}) => {
  const classes = useStyles();
  const handleClose = (event, reason) => {
    if(reason === 'clickaway'){
      return;
    }else{
      setNotify({
        ...notify,
        isOpen: false
      })
    }
  }
  return (
    <Snackbar 
      className={classes.root} 
      open={notify.isOpen} 
      autoHideDuration={4000} 
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      onClick={handleClose}
      >
      <Alert 
      severity={notify.type}
      onClick={handleClose}
      >
        {notify.message}
      </Alert>
    </Snackbar>
  )
}

export default Notifications
