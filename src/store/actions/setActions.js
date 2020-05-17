import * as actionTypes from "./actionTypes";
import axiosNotes from "../../axiosNotes";

export const newSpaceLocal = (spaceCount) => {
    return {
        type: actionTypes.NEW_SPACE,
        position: spaceCount,
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
            name: "NoteSet1",
            position: spaceCount
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