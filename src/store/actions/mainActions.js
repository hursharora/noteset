import * as actionTypes from "./actionTypes";


export const spaceChange = (newSpaceInd, newSpaceID) => {
    return {
        type: actionTypes.SPACE_CHANGE,
        newInd: newSpaceInd,
        newID: newSpaceID
    }
}