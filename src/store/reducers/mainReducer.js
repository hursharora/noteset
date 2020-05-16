import * as actions from "../actions/actionTypes"

const initialState = {
    activeSpacePosition: 0,
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
        default:
            return state;
    }
}

export default reducer;

