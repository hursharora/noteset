import * as actions from "../actions"

const initialState = {
    spaces: [{name: "NoteSet1", id: "noteset1", position: 0}],
    spacesCount: 1
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.NEW_SPACE:
            return {
                ...state,
                spaces: state.spaces.concat(
                    {
                        name: "Notset1",
                        id: new Date().toDateString(),
                        position: state.spacesCount
                    }),
                spacesCount: state.spacesCount + 1
            };
        default:
            return state;
    }
}

export default reducer;
