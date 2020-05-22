import * as actionTypes from "./actionTypes";
import axiosNotes from "../../axiosNotes";

export const newSpaceLocal = (newSpaceName) => {
    return {
        type: actionTypes.NEW_SPACE,
        id: "temp",
        name: newSpaceName
    };
}

export const updateSetID = (newID) => {
    return {
        type: actionTypes.UPDATE_SET_ID,
        newID: newID
    }
}

export const toggleNewSpaceLoading = () => {
    return {
        type: actionTypes.TOGGLE_NEW_SPACE_LOADING
    }
}

export const newSpace = (newSpaceName, uid, token) => {
    return dispatch => {
        dispatch(toggleNewSpaceLoading());
        dispatch(newSpaceLocal(newSpaceName)); //disable new space button here
        const newSpace = {
            name: newSpaceName
        }
        let urlPref = "/users/" + uid;
        let urlSuf = ".json?auth=" + token;
        axiosNotes.post(urlPref + "/notespaces" + urlSuf, newSpace)
            .then(r => {
                dispatch(updateSetID(r.data.name)); //enable it here
                dispatch(toggleNewSpaceLoading());
                axiosNotes.patch(urlPref + "/notespaces/" + r.data.name + urlSuf, {id: r.data.name})
                    .catch(e => console.log(e));
            });
    }
}

export const deleteSpace = (spaceID) => {
    return {
        type: actionTypes.TOGGLE_DELETING_SPACE,
        spaceID: spaceID
    }
}

export const continueDeleteSpaceLocal = spaceID => {
    return {
        type: actionTypes.DELETE_SPACE,
        spaceID: spaceID
    }
}

export const continueDeleteNotesLocal = spaceID => {
    return {
        type: actionTypes.DELETE_NOTES_SET,
        spaceID: spaceID
    }
}

export const setActiveSpaceNull = () => {
    return {
        type: actionTypes.ACTIVE_SPACE_NULL
    }
}

export const continueDeleteSpace = (spaceID, uid, token) => {
    return dispatch => {
        dispatch(continueDeleteSpaceLocal(spaceID));
        dispatch(continueDeleteNotesLocal(spaceID));
        dispatch(setActiveSpaceNull());
        let urlPref = "/users/" + uid;
        let urlSuf = ".json?auth=" + token;
        axiosNotes.delete(urlPref + "/notespaces/" + spaceID + urlSuf)
            .catch(e => console.log(e));
    }
}