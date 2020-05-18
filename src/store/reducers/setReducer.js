import * as actions from "../actions/actionTypes"

const initialState = {
    spaces: [],
    spaceCount: 0,
    deletingSpace: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.NEW_SPACE:
            return {
                ...state,
                spaces: state.spaces.concat(
                    {
                        name: action.name,
                        id: action.id
                    }),
                spaceCount: state.spaceCount + 1
            };
        case actions.UPDATE_SET_ID:
            const updatedSpaces = state.spaces.map(el => {
                if (el.id === "temp") {
                    return Object.assign({}, el, {id: action.newID});
                }
                return el;
            })
            return {
                ...state,
                spaces: updatedSpaces
            };
        case actions.INIT_SPACES:
            return {
                ...state,
                spaces: action.spaces,
                spaceCount: action.spaces.length
            };
        case actions.TOGGLE_DELETING_SPACE:
            return {
                ...state,
                deletingSpace: action.spaceID
            };
        case actions.DELETE_SPACE:
            return {
                ...state,
                spaces: state.spaces.filter(sp => sp.id !== action.spaceID),
                deletingSpace: null
            }
        default:
            return state;
    }
}

export default reducer;
