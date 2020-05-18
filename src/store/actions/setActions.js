import * as actionTypes from "./actionTypes";
import axiosNotes from "../../axiosNotes";

export const newSpaceLocal = (spaceCount) => {
    return {
        type: actionTypes.NEW_SPACE,
        id: "temp",
        name: "NoteSet1"
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

export const newSpace = (spaceCount) => {
    return dispatch => {
        dispatch(toggleNewSpaceLoading());
        dispatch(newSpaceLocal(spaceCount)); //disable new space button here
        const newSpace = {
            name: "NoteSet1"
        }
        axiosNotes.post("/notespaces.json", newSpace)
            .then(r => {
                dispatch(updateSetID(r.data.name)); //enable it here
                dispatch(toggleNewSpaceLoading());
                axiosNotes.patch("/notespaces/" + r.data.name + ".json", {id: r.data.name})
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

export const continueDeleteSpace = (spaceID) => {
    return dispatch => {
        dispatch(continueDeleteSpaceLocal(spaceID));
        dispatch(continueDeleteNotesLocal(spaceID));
        axiosNotes.delete("/notespaces/" + spaceID + ".json")
            .catch(e => console.log(e));
    }
}