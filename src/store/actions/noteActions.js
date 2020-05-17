import * as actionTypes from "./actionTypes";
import axiosNotes from "../../axiosNotes";

export const updatePositionLocal = (newX, newY, belongsTo, toUpdateID) => {
    return {
        type: actionTypes.UPDATE_NOTE_POSITION,
        newX: newX,
        newY: newY,
        belongsTo: belongsTo,
        toUpdateID: toUpdateID
    }
}

export const updatePosition = (newX, newY, belongsTo, toUpdateID) => {
    return dispatch => {
        dispatch(updatePositionLocal(newX, newY, belongsTo, toUpdateID));
        let requestString = "/notespaces/" + belongsTo + "/notes/" + toUpdateID + ".json";
        axiosNotes.patch(requestString, {xPos: newX, yPos: newY})
            .catch(e => console.log(e));
    }
}

export const updateTitleLocal = (newTitle, belongsTo, toUpdateID) => {
    return {
        type: actionTypes.UPDATE_NOTE_TITLE,
        newTitle: newTitle,
        belongsTo: belongsTo,
        toUpdateID: toUpdateID
    }
}

export const updateTitle = (newTitle, belongsTo, toUpdateID) => {
    return dispatch => {
        dispatch(updateTitleLocal(newTitle, belongsTo, toUpdateID));
        let requestString = "/notespaces/" + belongsTo + "/notes/" + toUpdateID + ".json";
        axiosNotes.patch(requestString, {title: newTitle})
            .catch(e => console.log(e));
    }
}

export const updateContentLocal = (newContent, belongsTo, toUpdateID) => {
    return {
        type: actionTypes.UPDATE_NOTE_CONTENT,
        newContent: newContent,
        belongsTo: belongsTo,
        toUpdateID: toUpdateID
    }
}

export const updateContent = (newContent, belongsTo, toUpdateID) => {
    return dispatch => {
        dispatch(updateContentLocal(newContent, belongsTo, toUpdateID));
        let requestString = "/notespaces/" + belongsTo + "/notes/" + toUpdateID + ".json";
        axiosNotes.patch(requestString, {content: newContent})
            .catch(e => console.log(e));
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

export const toggleNewNoteLoading = () => {
    return {
        type: actionTypes.TOGGLE_NEW_NOTE_LOADING
    }
}

export const newNote = (activeSpaceID) => {
    return dispatch => {
        dispatch(toggleNewNoteLoading());
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
                dispatch(toggleNewNoteLoading());
                axiosNotes.patch("/notespaces/" + activeSpaceID + "/notes/" + r.data.name + ".json",
                    {id: r.data.name})
                    .catch(e => console.log(e));
            });
    }
}


