import * as actionTypes from "./actionTypes";

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

export const newNote = (activeSpaceID) => {
    return {
        type: actionTypes.NEW_NOTE,
        activeSpaceID: activeSpaceID
    }
}


