import * as actions from "../actions/actionTypes"

const initialState = {
    activeSpacePosition: 0, //active space INDEX in state.set.spaces array
    initLoading: true,
    newNoteLoading: false,
    newSpaceLoading: false,
    activeSpaceID: null,
    auth: null //replace with auth token once logged in?
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
            }
        default:
            return state;
    }
}

export default reducer;

