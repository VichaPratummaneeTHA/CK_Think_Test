import React from 'react'
import { makeStyles ,AppBar, Toolbar, Grid, InputBase, IconButton, Badge  } from '@material-ui/core';
import {NotificationsNone, ChatBubble, PowerSettingsNew, Search} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#fff',
    transform: 'translateZ(0)'
  },
  searchInput: {
    opacity: '0.6',
    padding: `0px ${theme.spacing(1)}px`,
    fontSize: '1rem',
    '& .MuiSvgIcon-root': {
      marginRight: theme.spacing(1),
    },
    '&:hover': {
      backgroundColor: '#f2f2f2',
    }
  },
  btnRoot: {
    backgroundColor: 'green',
  },
  btnLabel: {
    backgroundColor: 'red',
  }
}));

const Header = () => {

  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Grid container alignItems='center'>
          <Grid item>
            <InputBase
             className={classes.searchInput} 
              startAdornment={<Search fontSize='small'/>}
              placeholder='Search for ...'
            />
          </Grid>
          <Grid item sm></Grid>
          <Grid item>
            <IconButton classes={{root: classes.btnRoot, label: classes.btnLabel}}>
                <Badge badgeContent={4} color='secondary'>
                    <NotificationsNone fontSize='small'/>
                </Badge>
            </IconButton>
            <IconButton>
                <Badge badgeContent={3} color='primary'>
                    <ChatBubble fontSize='small'/>
                </Badge>
            </IconButton>
            <IconButton>
                <Badge color='error'>
                    <PowerSettingsNew fontSize='small' color='primary'/>
                </Badge>
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Header
