import * as actionTypes from "./actionTypes";
import axiosNotes from "../../axiosNotes";

export const spaceChange = (newSpaceInd, newSpaceID) => {
    return {
        type: actionTypes.SPACE_CHANGE,
        newInd: newSpaceInd,
        newID: newSpaceID
    }
}

export const initSpaces = (data) => {
    let spaces = [];
    for (let key in data) {
        spaces.push({
            name: data[key].name,
            id: data[key].id
        })
    }
    return {
        type: actionTypes.INIT_SPACES,
        spaces: spaces
    }
};

export const initNotes = (data) => {
    let notesToAdd = {};
    for (let key in data) {
        let notesInner = [];
        for (let innerKey in data[key].notes) {
            notesInner.push(data[key].notes[innerKey]);
        }
        notesToAdd[key] = notesInner;
    }
    return {
        type: actionTypes.INIT_NOTES,
        notes: notesToAdd
    }
};

export const doneLoading = () => {
    return {
        type: actionTypes.DONE_LOADING
    }
}

export const intiLoad = () => {
    return dispatch => {
        axiosNotes.get("/notespaces.json")
            .then(r => {
                dispatch(initSpaces(r.data));
                dispatch(initNotes(r.data));
                dispatch(doneLoading());
            })
    }
}