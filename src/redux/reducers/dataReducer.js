import * as actionTypes from '../types';

const initialState={
    screams:[],
    scream:{},
    loading:false,
};

export default (state=initialState,action)=>{
    switch(action.type){
        case(actionTypes.LOADING_DATA):
        return{
            ...state,
            loading:true,
        };
        case(actionTypes.SET_SCREAMS):
        return{
            ...state,
            screams:action.payload,
            loading:false,
        };
        case(actionTypes.DELETE_SCREAM):
        let indexDelete=state.screams.findIndex((scream)=>scream.screamId === action.payload);
        state.screams.splice(indexDelete,1);
        return{
            ...state
        }
        case(actionTypes.LIKE_SCREAM):
        case(actionTypes.UNLIKE_SCREAM):
        let index=state.screams.findIndex((scream)=>scream.screamId === action.payload.screamId);
        state.screams[index] = action.payload;
        if(state.scream.screamId === action.payload.screamId){
            state.scream = action.payload;
        }
        return{
            ...state,
        }
        case(actionTypes.POST_SCREAM):
        return{
            ...state,
            screams:[
                action.payload,
                ...state.screams
            ]
        }
        case(actionTypes.SET_SCREAM):
        return{
            ...state,
            scream:action.payload,
        }
        case(actionTypes.SUBMIT_COMMENT):
        return{
            ...state,
            scream:{
                ...state.scream,
                comments:[
                    ...state.scream.comments,
                    action.payload
                ]
            }
        }
        default:
            return state;
    };
};