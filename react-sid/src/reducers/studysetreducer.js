import {GET_STUDY_SET_FETCH,GET_STUDY_SET_SUCCESS,GET_STUDY_SET_FAILURE} from '../actions/studysetactions';

const initState = {
    isFetching: false,
    isError: false,
    terms: [],
};

const studySetReducer = (state = initState, action) => {
    switch(action.type) {
        case GET_STUDY_SET_FETCH: 
            return {...state, isFetching: true, isError: false};
        case GET_STUDY_SET_SUCCESS: 
            return {...state, isFetching: false, terms: action.payload, isError: false};
        case GET_STUDY_SET_FAILURE: 
            return {...state, isFetching: false, terms: [], isError: true};
        default: 
            return state;
    }
}

export default studySetReducer;