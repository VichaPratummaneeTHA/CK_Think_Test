import React, {Fragment} from 'react'
import './App.css'
import {makeStyles, CssBaseline, createMuiTheme } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles';
//Components
import SideBar from '../components/SideBar'
import Header from '../components/Header'
import Employees from '../components/employees/Employees'



const theme = createMuiTheme({
  palette: {
    primary:{
      main: '#16c79a',
      light: '#7986cb',
    },
    secondary:{
      main: '#af0069',
      light: '#ff4081',
    },
    background: {
      default: '#bee5d3'
    },
    props:{
      MuiIconButton: {
        disableRipple: false,
      }
    }
  } 
});

const useStyles = makeStyles({
  appMain: {
    paddingLeft: '320px',
    width: '100%'
  }
});
const App = () => {

  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
    <Fragment>
      <SideBar />
      <div className={classes.appMain}>
        <Header />
        <Employees />
      </div> 
      <CssBaseline />
    </Fragment>
    </ThemeProvider>
  )
}

export default App
