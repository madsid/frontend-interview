import {SAMPLE_ACTION_SUCCESS, SAMPLE_ACTION_FETCH} from '../actions/sampleactions';

const initState = {};

const sampleReducer = (state = initState, action) => {
    switch(action.type) {
        case SAMPLE_ACTION_FETCH:
            return {...state, message: 'loading...'};
        case SAMPLE_ACTION_SUCCESS: 
            return {...state, message: action.payload};
        default: 
            return state;
    }
}

export default sampleReducer;