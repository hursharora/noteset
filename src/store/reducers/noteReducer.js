import * as actions from "../actions/actionTypes";

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

const noteUpdateHelper = (state, belongsTo, toUpdateID, objToMerge) => {
    return {
        ...state,
        [belongsTo]: state[belongsTo].map(el => {
            if (el.id === toUpdateID) {
                return Object.assign({}, el, objToMerge);
            }
            return el;
        })
    };
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.UPDATE_NOTE_POSITION:
            return noteUpdateHelper(
                state,
                action.belongsTo,
                action.toUpdateID,
                {xPos: action.newX, yPos: action.newY});
        case actions.UPDATE_NOTE_TITLE:
            return noteUpdateHelper(
                state,
                action.belongsTo,
                action.toUpdateID,
                {title: action.newTitle});
        case actions.UPDATE_NOTE_CONTENT:
            return noteUpdateHelper(
                state,
                action.belongsTo,
                action.toUpdateID,
                {content: action.newContent});
        case actions.NEW_NOTE:
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
