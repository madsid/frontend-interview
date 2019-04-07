export const SAMPLE_ACTION_FETCH = 'SAMPLE_ACTION_FETCH';
export const SAMPLE_ACTION_SUCCESS = 'SAMPLE_ACTION_SUCCESS';
export const SAMPLE_ACTION_FAILED = 'SAMPLE_ACTION_FAILED';

export const getSampleAction = () => async dispatch => {
    dispatch({
        type: SAMPLE_ACTION_FETCH,
    });

    setTimeout(() => {
        dispatch({
            type: SAMPLE_ACTION_SUCCESS,
            payload: 'sample action success message',
        });
    }, 1000);
}

