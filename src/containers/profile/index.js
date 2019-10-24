import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {axiosWithAuth} from '../../utils/axiosAuth.js';
import Axios from 'axios'
import { connect } from "react-redux";
import { login } from "../../Redux/actions/index";

const token = localStorage.getItem('token')

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

  const  Profile = (props) => {
  const classes = useStyles();
  const [profile, setProfile] = useState([])
  const [favorite, setFavorite] = useState([])
  const [teams, setTeams] = useState([])
  

  useEffect(() => {
    axiosWithAuth()
    .get('https://bgp-be-staging.herokuapp.com/api/teams')
    .then(res => {
      console.log("teams", res.data)
      
      setTeams(res.data)
    })
    .catch(error => {
      console.log("error", error)
    })
  }, []) 

  useEffect(() => {
    axiosWithAuth()
    .get('https://bgp-be-staging.herokuapp.com/api/favoriteTeams/1')
    .then(res => {
      
      console.log("Favorite", res.data)
      setFavorite(res.data)
    })
    .catch(error => {
      console.log('error', error)
    })
  }, [])

  //const profile_id = token.id
  
  useEffect(() => {
    axiosWithAuth()
    .get(`http://localhost:5000/api/profiles/1`)
    .then(res => {
      localStorage.getItem('token')
      console.log("token", token)            
      setProfile(res.data)
      console.log("setProfile", res.data)
      
    })
    .catch(error => {
      console.log('error', error)
    })
  }, [])
  //console.log("id", profile_id)

  const submit = e => {
    e.preventDefault()
    axiosWithAuth()
    .post('https://bgp-be-staging.herokuapp.com/api/favoriteTeams', favorite.team_name)
    .then(res => {
      localStorage.setItem('token', res.data.payload)
    })
    .catch(error => {
      console.log("error", error)
    })
  }
  useEffect(() => {
    console.log("props2", props)
  })
    
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {profile.map(user => { return<Paper key={user.profile_id} className={classes.paper}>Welcome {user.username}!</Paper>})}
        </Grid>         
        <Grid item xs={12}>
          <Paper className={classes.paper}>Your Favorite Teams </Paper>
        </Grid>        
        <Grid item xs={12}>
        {favorite.map(favorite => {return<Paper className={classes.paper}>{favorite.team_name}</Paper>})}
        </Grid>
        <Grid item xs={4}>
          <button><Paper className={classes.paper}>Add More Favorite Teams To Follow</Paper></button>
        </Grid>
        <Grid item xs={9}>
        {teams.map(team => {return<button onClick={submit}><Paper className={classes.paper}>ADD {team.team_name}</Paper></button>})}
        </Grid>                    
      </Grid>          
    </div>
  );
}

const mapStateToProps = state => {
  console.log(state)
  return {
    id: state.profile_id
  }
}
export default connect(
  mapStateToProps,
  {}
)(Profile);


 



