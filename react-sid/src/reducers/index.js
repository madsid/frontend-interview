import {combineReducers} from 'redux';

import sampleReducer from './samplereducer';

const rootReducer = combineReducers({
    sample: sampleReducer,
});

export default rootReducer;