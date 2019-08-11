import * as actionTypes from '../types';

const initialState={
    loading:false,
    error:null,
}

export default (state=initialState,action) => {
    switch(action.type){
        case(actionTypes.SET_ERRORS):
            return{
                ...state,
                loading:false,
                error:action.payload,
            };
        case(actionTypes.CLEAR_ERRORS):
            return {
                ...state,
                loading:false,
                error:null,
            };
        case(actionTypes.LOADING_UI):
            return{
                ...state,
                loading:true,
            };
        case(actionTypes.STOP_LOADING_UI):
            return{
                ...state,
                loading:false,
            };
        default:
            return state;
    }
};