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

export const updatePosition = (newX, newY, belongsTo, toUpdateID, uid, token) => {
    return dispatch => {
        let urlPref = "users/" + uid;
        let urlSuf = ".json?auth=" + token;
        dispatch(updatePositionLocal(newX, newY, belongsTo, toUpdateID));
        let requestString = urlPref + "/notespaces/" + belongsTo + "/notes/" + toUpdateID + urlSuf;
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

export const updateTitle = (newTitle, belongsTo, toUpdateID, uid, token) => {
    return dispatch => {
        dispatch(updateTitleLocal(newTitle, belongsTo, toUpdateID));
        let urlPref = "users/" + uid;
        let urlSuf = ".json?auth=" + token;
        let requestString = urlPref + "/notespaces/" + belongsTo + "/notes/" + toUpdateID + urlSuf;
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

export const updateContent = (newContent, belongsTo, toUpdateID, uid, token) => {
    return dispatch => {
        dispatch(updateContentLocal(newContent, belongsTo, toUpdateID));
        let urlPref = "users/" + uid;
        let urlSuf = ".json?auth=" + token;
        let requestString = urlPref + "/notespaces/" + belongsTo + "/notes/" + toUpdateID + urlSuf;
        axiosNotes.patch(requestString, {content: newContent})
            .catch(e => console.log(e));
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

export const newNoteLocal = (activeSpaceID, note) => {
    return {
        type: actionTypes.NEW_NOTE,
        activeSpaceID: activeSpaceID,
        note: note
    }
}

export const newNote = (activeSpaceID, uid, token, content = "", title = "") => {
    return dispatch => {
        dispatch(toggleNewNoteLoading());
        const newNote = {
            title: title,
            content: content,
            xPos: "0px",
            yPos: "0px",
            id: "temp"
        }
        dispatch(newNoteLocal(activeSpaceID, newNote)); //disable new note button here

        let urlPref = "users/" + uid;
        let urlSuf = ".json?auth=" + token;
        axiosNotes.post(urlPref + "/notespaces/" + activeSpaceID + "/notes" + urlSuf, newNote)
            .then(r => {
                dispatch(updateNoteID(activeSpaceID, r.data.name)); //enable new note button
                dispatch(toggleNewNoteLoading());
                axiosNotes.patch(urlPref + "/notespaces/" + activeSpaceID + "/notes/" + r.data.name + urlSuf,
                    {id: r.data.name})
                    .catch(e => console.log(e));
            });
    }
}

export const deleteNoteLocal = (spaceID, noteID) => {
    return {
        type: actionTypes.DELETE_NOTE,
        spaceID: spaceID,
        noteID: noteID
    }
}

export const deleteNote = (spaceID, noteID, uid, token) => {
    return dispatch => {
        let urlPref = "users/" + uid;
        let urlSuf = ".json?auth=" + token;
        dispatch(deleteNoteLocal(spaceID, noteID));
        axiosNotes.delete(urlPref + "/notespaces/" + spaceID + "/notes/" + noteID + urlSuf)
            .catch(e => console.log(e));
    }
}


