import * as actionTypes from "./actionTypes";
import axiosNotes from "../../axiosNotes";

export const updatePosition = (newX, newY, belongsTo, toUpdateID) => {
    return {
        type: actionTypes.UPDATE_NOTE_POSITION,
        newX: newX,
        newY: newY,
        belongsTo: belongsTo,
        toUpdateID: toUpdateID
    }
}

export const updateTitle = (newTitle, belongsTo, toUpdateID) => {
    return {
        type: actionTypes.UPDATE_NOTE_TITLE,
        newTitle: newTitle,
        belongsTo: belongsTo,
        toUpdateID: toUpdateID
    }
}

export const updateContent = (newContent, belongsTo, toUpdateID) => {
    return {
        type: actionTypes.UPDATE_NOTE_CONTENT,
        newContent: newContent,
        belongsTo: belongsTo,
        toUpdateID: toUpdateID
    }
}

export const newNoteLocal = activeSpaceID => {
    return {
        type: actionTypes.NEW_NOTE,
        activeSpaceID: activeSpaceID
    }
}

export const updateNoteID = (belongsToSpace, newID) => {
    return {
        type: actionTypes.UPDATE_NOTE_ID,
        belongsTo: belongsToSpace,
        newID: newID
    }
}

export const newNote = (activeSpaceID) => {
    return dispatch => {
        dispatch(newNoteLocal(activeSpaceID)); //disable new note button here
        const newNote = {
            title: "",
            content: "",
            xPos: "0px",
            yPos: "0px"
        }
        axiosNotes.post("/notespaces/" + activeSpaceID + "/notes.json", newNote)
            .then(r => {
                dispatch(updateNoteID(activeSpaceID, r.data.name)); //enable new note button
                axiosNotes.patch("/notespaces/" + activeSpaceID + "/notes/" + r.data.name + ".json",
                    {id: r.data.name})
                    .catch(e => console.log(e));
            });
    }
}


