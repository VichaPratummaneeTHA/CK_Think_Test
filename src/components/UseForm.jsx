import {useState} from 'react'
import {makeStyles} from '@material-ui/core'

const UseForm = (initalValues, validateOnChange=false, validate) => {
  const [values, setValues] = useState(initalValues);
  const [errors, setErrors] = useState({})

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setValues({
      ...values,
      [name]: value
    });

    if(validateOnChange){
      validate({[name]: value})
    }
  }

  const resetForm = () => {
    setValues(initalValues)
    setErrors({})
  }
  
  return {values, setValues, errors, setErrors, handleInputChange, resetForm}
}


const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1)
    }
  }
}));

const Form = ({
  children, ...other
}) => {
  const classes = useStyles();

  return (
    <form className={classes.root} {...other}>
      {children}
    </form>
  )
}

export {UseForm, Form}
