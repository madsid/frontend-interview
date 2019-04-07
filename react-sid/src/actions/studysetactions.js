export const GET_STUDY_SET_FETCH = 'GET_STUDY_SET_FETCH';
export const GET_STUDY_SET_SUCCESS = 'GET_STUDY_SET_SUCCESS';
export const GET_STUDY_SET_FAILURE = 'GET_STUDY_SET_FAILURE';

export const getStudySet = id => dispatch => {
    console.log(`Fetching study set with id ${ id }`);

    dispatch({
        type: GET_STUDY_SET_FETCH,
    });

    const TERMS = [
        {
            id: 1,
            word: 'Nebraska',
            definition: 'Lincoln',
        },
        {
            id: 2,
            word: 'Massachusetts',
            definition: 'Boston',
        },
        {
            id: 3,
            word: 'California',
            definition: 'Sacramento',
        },
    ];

    setTimeout(() => {
        dispatch({
            type: GET_STUDY_SET_SUCCESS,
            payload: TERMS,
        });
    }, 300);
}