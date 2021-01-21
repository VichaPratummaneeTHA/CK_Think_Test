import React from 'react'
import {Dialog, DialogTitle, DialogContent, DialogActions, Typography, IconButton, makeStyles} from '@material-ui/core'
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import Buttons from '../../components/controller/Buttons'

const useStyles = makeStyles(theme => ({
  dialog:{
    padding:theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5)
  },
  dialogTitle: {
    textAlign: 'center',
  },
  dialogContent: {
    textAlign: 'center',
  },
  dialogAction: {
    justifyContent: 'center'
  },
  titleIcon: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      cursor: 'dafault'
    },
    '& .MuiSvgIcon-root': {
      fontSize: '8rem'
    }
  }
}))

const ConfirmDialog = ({
 confirmDialog, setConfirmDialog
}) => {

  const classes = useStyles();

  return (

    <Dialog  open={confirmDialog.isOpen} classes={{paper: classes.dialog}}>
      <DialogTitle className={classes.dialogTitle}>
          <IconButton className={classes.titleIcon}>
            <NotListedLocationIcon />
          </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant='h6'>
          {confirmDialog.title}
        </Typography>
        <Typography variant='subtitle2'>
          {confirmDialog.subTitle}
        </Typography>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <Buttons 
        text='No' 
        color='default'
        onClick={()=> setConfirmDialog({...confirmDialog, isOpen: false})} 
        />
        <Buttons 
        text='Yes' 
        color='secondary'
        onClick={confirmDialog.onConfirm}  
        />
      </DialogActions>
    </Dialog>
  ) 
}

export default ConfirmDialog
