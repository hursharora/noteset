import * as actions from "../actions"

const initialState = {
    activeSpacePosition: 0,
    activeSpaceID: 0,
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

