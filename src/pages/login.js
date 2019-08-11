import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
import {Link} from 'react-router-dom';

//Material UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//Redux
import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.spreadThis
});

class Login extends Component {

    constructor(){
        super();
        this.state = {
            email:'',
            password:'',
            errors:null,
        }
    };

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.error){
            this.setState({errors:nextProps.UI.error});
        };
    };

    handleSubmit = (event) => {
        event.preventDefault();
        
        const userData = {
            email:this.state.email,
            password:this.state.password
        };

        this.props.loginUser(userData,this.props.history);
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
    };

    render() {
        const { classes, UI:{loading} }=this.props;
        const {errors}=this.state;
        let errorMessage = null;

        if(errors){
            errorMessage = <Typography variant='body2' className={classes.customError}>{errors.general}</Typography>
        };


        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt="Icon" className={classes.image}/>
                    <Typography variant="h2" className={classes.pageTitle}>Login</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                    <TextField id="email" name="email" type="email" label="Email" className={classes.textField}
                    helperText={errors?errors.errors?errors.errors.email:null:null} error={errors?true:false}
                    value={this.state.email} onChange={this.handleChange}
                    fullWidth/>
                    <TextField id="password" name="password" type="password" label="Password" className={classes.textField}
                    helperText={errors?errors.errors?errors.errors.password:null:null} error={errors?true:false}
                    value={this.state.password} onChange={this.handleChange}
                    fullWidth/>
                    {errorMessage}
                    {loading?
                    (<CircularProgress size={30} className={classes.progress}/>)
                    :(<Button type="submit" variant="contained" color="primary" className={classes.button}>Login</Button>)}
                    <br/>
                    <small>Don't have an account yet? Sign up <Link to='/signup'>here</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
};

Login.propTypes = {
    classes : PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user : PropTypes.object.isRequired,
    UI : PropTypes.object.isRequired,
};

const mapStateToProps = (state)=>{
    return{
        user:state.user,
        UI:state.UI,
    }
};

const mapActionsToProps = {
    loginUser,
};

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(Login));