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
import {signupUser,logoutUser} from '../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.spreadThis
});

class Signup extends Component {

    constructor(){
        super();
        this.state = {
            email:'',
            password:'',
            confirmPassword:'',
            handle:'',
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
        this.setState({loading:true});
        
        const newUserData = {
            email:this.state.email,
            password:this.state.password,
            confirmPassword:this.state.confirmPassword,
            handle:this.state.handle,
        };

        this.props.signupUser(newUserData,this.props.history);
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
    };

    render() {
        const { classes, UI:{loading} }=this.props;
        const {errors }=this.state;
        let errorMessage = null;

        if(errors){
            errorMessage = <Typography variant='body2' className={classes.customError}>{errors.general}</Typography>
            if(errors.email === "email is already in use"){
            errorMessage = <Typography variant='body2' className={classes.customError}>Email is already in use</Typography>
            };
            if(errors.errors){
                if(errors.errors.confirmPassword === "Passwords must match"){
                errorMessage = <Typography variant='body2' className={classes.customError}>Passwords must match</Typography>
                };  
            }; 
        };

        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt="Icon" className={classes.image}/>
                    <Typography variant="h2" className={classes.pageTitle}>Signup</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                    <TextField id="email" name="email" type="email" label="Email" className={classes.textField}
                    helperText={errors?errors.errors?errors.errors.email:null:null} error={errors?true:false}
                    value={this.state.email} onChange={this.handleChange}
                    fullWidth/>
                    <TextField id="password" name="password" type="password" label="Password" className={classes.textField}
                    helperText={errors?errors.errors?errors.errors.password:null:null} error={errors?true:false}
                    value={this.state.password} onChange={this.handleChange}
                    fullWidth/>
                    <TextField id="confirmPassword" name="confirmPassword" type="Password" label="Confirm Password" className={classes.textField}
                    helperText={errors?errors.errors?errors.errors.confrimPassword:null:null} error={errors?true:false}
                    value={this.state.confirmPassword} onChange={this.handleChange}
                    fullWidth/>
                    <TextField id="handle" name="handle" type="text" label="Username" className={classes.textField}
                    helperText={errors?errors.handle:null} error={errors?true:false}
                    value={this.state.handle} onChange={this.handleChange}
                    fullWidth/>
                    {errorMessage}
                    {loading?
                    (<CircularProgress size={30} className={classes.progress}/>)
                    :(<Button type="submit" variant="contained" color="primary" className={classes.button}>Sign up</Button>)}
                    <br/>
                    <small>Already have an account? Log in <Link to='/login'>here</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
};

Signup.propTypes = {
    classes : PropTypes.object.isRequired,
    user : PropTypes.object.isRequired,
    UI : PropTypes.object.isRequired,
    signupUser : PropTypes.func.isRequired,
    logoutUser : PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return{
        user:state.user,
        UI:state.UI,
    };
};

const mapActionToProps = {
    signupUser,
    logoutUser,
}

export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(Signup));