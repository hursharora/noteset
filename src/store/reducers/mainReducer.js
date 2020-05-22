import * as actions from "../actions/actionTypes"

const initialState = {
    activeSpacePosition: 0, //active space INDEX in state.set.spaces array
    initLoading: true,
    newNoteLoading: false,
    newSpaceLoading: false,
    activeSpaceID: null,
    authToken: null,
    authError: null,
    uid: null,
    authLoading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SPACE_CHANGE:
            return {
                ...state,
                activeSpaceID: action.newID,
                activeSpacePosition: action.newInd
            };
        case actions.DONE_LOADING:
            return {
                ...state,
                initLoading: false
            };
        case actions.TOGGLE_NEW_NOTE_LOADING:
            return {
                ...state,
                newNoteLoading: !state.newNoteLoading
            };
        case actions.TOGGLE_NEW_SPACE_LOADING:
            return {
                ...state,
                newSpaceLoading: !state.newSpaceLoading
            };
        case actions.ACTIVE_SPACE_NULL:
            return {
                ...state,
                activeSpaceID: null
            };
        case actions.AUTH_SUCCESS:
            return {
                ...state,
                authToken: action.token,
                uid: action.uid,
                authLoading: false
            };
        case actions.AUTH_START:
            return {
                ...state,
                authLoading: true
            };
        case actions.AUTH_FAIL:
            return {
                ...state,
                authLoading: false,
                authError: action.error
            }
        case actions.LOGOUT:
            return {
                ...state,
                authError: null,
                authToken: null,
                uid: null,
                activeSpaceID: null,
                activeSpacePosition: 0
            };
        default:
            return state;
    }
}

export default reducer;

