import React, { Component , Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../utils/myButton';

// Redux
import {connect} from 'react-redux';
import {postScream,clearErrors} from '../../redux/actions/dataActions';

// Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';

// Material UI Icon
import AddIcon from '@material-ui/icons/Add';

const styles = (theme) => ({
    ...theme.spreadThis,
    submitButton:{
        position:'relative',
        float:'right',
        marginTop:10,
    },
    progressSpinner:{
        position:'absolute'
    },
    closeButton:{
        position:'absolute',
        left:'91%',
        top:'6%',
    },
});

class PostScream extends Component { 
    state = {
        open:false,
        body:'',
        errors:{}
    };

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.error){
            this.setState({errors:nextProps.UI.error});
        };
        if(!nextProps.UI.error && !nextProps.UI.loading){
            this.setState({body:'',open:false,errors:{}});
        };
    };

    handleOpen = () => {
        this.setState({open:true});
    };

    handleClose = () => {
        this.setState({open:false,errors:{}});
        this.props.clearErrors();
    };

    handleChange = (event) => {
        this.setState({[event.target.name]:event.target.value});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.postScream({
            body:this.state.body
        });
    };

    render(){
        const {errors} = this.state;
        const {classes , UI:{loading}} = this.props;

        return(
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Create a new scream">
                    <AddIcon/>
                </MyButton>
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth maxWidth="sm">
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </MyButton>
                    <DialogTitle>Post a new scream!</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField name="body" type="text" label="New Scream" multiline rows="3" placeholder="Your new scream here" error={errors.body?true:false} helperText={errors.body} className={classes.textField} onChange={this.handleChange} fullWidth/>
                            <Button type="submit" variant="contained" color="primary" className={classes.submitButton} disabled={loading}>Submit{loading && <CircularProgress size={30} className={classes.progressSpinner}/>}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    };
}; 

postScream.propTypes = {
    postScream:PropTypes.func.isRequired,
    clearErrors:PropTypes.func.isRequired,
    UI:PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    UI:state.UI,
});

const mapActionToProps = {
    postScream,
    clearErrors,
};

export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(PostScream));