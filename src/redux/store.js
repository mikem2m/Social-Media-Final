import {createStore,combineReducers,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';

// Reducers 
import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import UIReducer from './reducers/UIReducer';

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
    user:userReducer,
    data:dataReducer,
    UI:UIReducer
});

const store = createStore(
    reducers,
    initialState,
    applyMiddleware(...middleware)
);

    // compose(
    //     applyMiddleware(...middleware),
    //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;