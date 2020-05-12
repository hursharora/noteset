const initialState = {
    spaces: [{name: "NoteSet1", id: 0}]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "NEW_SPACE":
            return {
                ...state,
                spaces: state.spaces.concat({name: "Notset1", id: new Date()})
            }
    }
    return state;
}

export default reducer;
