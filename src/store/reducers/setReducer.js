import * as actions from "../actions/actionTypes"

const initialState = {
    spaces: [],
    spaceCount: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.NEW_SPACE:
            return {
                ...state,
                spaces: state.spaces.concat(
                    {
                        name: action.name,
                        id: action.id,
                        position: action.position
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
                spaces: action.spaces,
                spaceCount: action.spaces.length
            }
        default:
            return state;
    }
}

export default reducer;
