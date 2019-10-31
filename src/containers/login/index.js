// Render Prop
import React, { useState } from "react";
import { connect } from "react-redux";
import { login } from "../../Redux/actions/index";
import { Link, Redirect } from "react-router-dom";
import Loader from "react-loader-spinner";
import "../formstyle/index.css";
import { FormValidation } from "calidation";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

const LoginForm = ({ login }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    username: "",
    password: ""
  });


  

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    login(values);
  };

  return (
    <div className="RegisterForm">
      <form
        onSubmit={e => this.handleSubmit(e)}
        className={classes.container}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="username"
          label="Username"
          className={classes.textField}
          value={values.username}
          onChange={handleChange("username")}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          className={classes.textField}
          value={values.password}
          onChange={handleChange("password")}
          margin="normal"
          variant="outlined"
          fullWidth
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          className={classes.button}
          onClick={e => handleSubmit(e)}
        >
          Login
        </Button>
        <br />

        <span>
          Don't have an account yet? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    error: state.error,
    loginError: state.loginError
  };
};
export default connect(
  mapStateToProps,
  { login }
)(LoginForm);
