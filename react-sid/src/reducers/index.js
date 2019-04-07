import {combineReducers} from 'redux';

import sampleReducer from './samplereducer';
import studySetReducer from './studysetreducer';

const rootReducer = combineReducers({
    sample: sampleReducer,
    study: studySetReducer,
});

export default rootReducer;