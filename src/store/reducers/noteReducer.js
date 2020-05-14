import * as actions from "../actions";

const initialState = {
    "noteset1": [{title: "My first note", content:"my first note content", id: 3, xPos: "0px", yPos: "0px"}]
}

//notespace_id: notes
// {
//     setID: []
// }
//notes
//title, content, id, color, xpos, ypos, set


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.UPDATE_NOTE_POSITION:
            return {
                ...state,
                [action.belongsTo]: state[action.belongsTo].map(el => {
                    if (el.id === action.toUpdateID) {
                        return Object.assign({}, el, {xPos: action.newX, yPos: action.newY});
                    }
                    return el;
                })
            };
        default:
            return state;
    }
}


export default reducer;
