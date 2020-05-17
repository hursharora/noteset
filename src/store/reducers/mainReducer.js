import * as actions from "../actions/actionTypes"

const initialState = {
    activeSpacePosition: 0,
    initLoading: true,
    activeSpaceID: null,
    auth: true
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
            }
        default:
            return state;
    }
}

export default reducer;

