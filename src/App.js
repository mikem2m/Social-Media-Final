import React,{Component} from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import themeFile from './utils/theme';
import jwtDecode from 'jwt-decode';
import './App.css';
import user from './pages/user';

// Material UI
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

// Pages
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';

// Components
import Navbar from './components/Layout/Navbar';
import AuthRoute from './utils/AuthRoute';

// Redux
import { Provider } from 'react-redux';
import Store from './redux/store';
import * as actionTypes from './redux/types';
import {logoutUser,getUserData} from './redux/actions/userActions';
import axios from 'axios';

const theme = createMuiTheme(themeFile);

axios.defaults.baseURL = "https://us-central1-socialnba-9a208.cloudfunctions.net/api" ;

// "proxy": "https://us-central1-socialnba-9a208.cloudfunctions.net/api"

const token = localStorage.FBIdToken;

if(token){
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp*1000 < Date.now()){
  Store.dispatch(logoutUser());
  window.location.href = '/login';
  }else{
  Store.dispatch({type:actionTypes.SET_AUTHENTICATED});
  axios.defaults.headers.common['Authorization']=token;
  Store.dispatch(getUserData());
  }
};

class App extends Component {
  render(){
  return (
    <MuiThemeProvider theme={theme}>
    <Provider store={Store}>
      <BrowserRouter>
      <Navbar/>
      <div className="container">
      <Switch>
        <Route exact path='/' component={Home}/>
        <AuthRoute exact path='/login' component={Login} />
        <AuthRoute exact path='/signup' component={Signup} />
        <Route exact path='/users/:handle' component={user}/>
        <Route exact path='/users/:handle/scream/:screamId' component={user}/> 
      </Switch>
      </div>
      </BrowserRouter>
    </Provider>
    </MuiThemeProvider>
  )
}
};

export default App;