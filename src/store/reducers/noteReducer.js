import * as actions from "../actions";

const initialState = {
    "noteset1": [
        {
            title: "My first note",
            content: "My first note content",
            id: 3,
            xPos: "0px",
            yPos: "0px"
        }
    ]
}

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
        case actions.UPDATE_NOTE_TITLE:
            return {
                ...state,
                [action.belongsTo]: state[action.belongsTo].map(el => {
                    if (el.id === action.toUpdateID) {
                        return Object.assign({}, el, {title: action.newTitle});
                    }
                    return el;
                })
            };
        case actions.UPDATE_NOTE_CONTENT:
            return {
                ...state,
                [action.belongsTo]: state[action.belongsTo].map(el => {
                    if (el.id === action.toUpdateID) {
                        return Object.assign({}, el, {content: action.newContent});
                    }
                    return el;
                })
            };
        case actions.NEW_NOTE:
            console.log(action.activeSpaceID);
            let noteSpace = [];
            if (state.hasOwnProperty(action.activeSpaceID)) {
                noteSpace = [...state[action.activeSpaceID]];
            }
            return {
                ...state,
                [action.activeSpaceID]: noteSpace.concat(
                    {
                        title: "",
                        content: "",
                        id: new Date(),
                        xPos: "0px",
                        yPos: "0px"
                    })
            }
        default:
            return state;
    }
}


export default reducer;
