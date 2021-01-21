import React from 'react'
import {Dialog, DialogTitle, DialogContent, Typography, makeStyles} from '@material-ui/core'
import {Close} from '@material-ui/icons'
//Componet
import ActionButtons from '../../components/controller/ActionButtons'

const useStyles = makeStyles(theme=> ({
  dialogWrap: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5)
  }
}))
const Popup = ({
  title, children, open, setOpenPopup
}) => {
  const classes = useStyles();
  return (
    <Dialog open={open} maxWidth='md' classes={{paper: classes.dialogWrap}}>
      <DialogTitle>
              <div style={{display: 'flex'}}>
                  <Typography variant='h6' component='div' style={{flexGrow: '1'}}>
                      {title}
                  </Typography>
                  <ActionButtons color='secondary' onClick={() => setOpenPopup(false)}>
                      <Close />
                  </ActionButtons>
              </div>
      </DialogTitle>
      <DialogContent dividers>
              {children}
      </DialogContent>
    </Dialog>
  )
}

export default Popup
