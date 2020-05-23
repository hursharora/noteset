import * as actionTypes from "./actionTypes";
import axiosNotes from "../../axiosNotes";
import * as setActions from "./setActions";
import * as noteActions from "./noteActions";

const tutorialNote = "Tutorial<div><input type=\"checkbox\" " +
    "id=\"input_1590124768642\">&nbsp;Try dragging notes around by grabbing them from the top-right corner</div><div><br>" +
    "</div><div><input type=\"checkbox\" id=\"input_1590124817818\">&nbsp;Try creating tasks by typing task followed by a :</div><div><br>" +
    "</div><div><input type=\"checkbox\" id=\"input_1590124853476\">&nbsp;Create a new set by pressing the add button on the sidebar</div><div><br>" +
    "</div><div>Everything is automatically saved!</div><div><br></div><div>Thank you for checking out NoteSet!<br></div><div>";


export const spaceChange = (newSpaceInd = -1, newSpaceID) => {
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


export const initLoad = (uid, token) => {
    let urlPref = "users/" + uid;
    let urlSuf = "?auth=" + token;
    return (dispatch, getState) => {
        console.log(getState().main);
        axiosNotes.get(urlPref + "/notespaces.json" + urlSuf)
            .then(r => {
                if (r.data === null) {
                    let initTitle = "Welcome to NoteSet!";
                    let initContent = tutorialNote;
                    dispatch(setActions.newSpace("My first noteset", uid, token));
                    console.log("first run");
                    setTimeout(() => {
                        dispatch(noteActions.newNote(getState().set.spaces[0].id, uid, token, initContent, initTitle))
                        dispatch(doneLoading())},2000)
                } else {
                    dispatch(initSpaces(r.data));
                    dispatch(initNotes(r.data));
                    dispatch(doneLoading());
                }
            })
            .catch(e => console.log(e));
    }
}

const projectApiKey = "AIzaSyBrSCrninCHTVPgD4skpPiv6XqDgqCxTI0";

export const authenticate = (email, password, signIn) => {
    let authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
    if (signIn) {
        authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
    }
    authUrl += projectApiKey;
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true
    };
    return dispatch => {
        dispatch(authStart());
        axiosNotes.post(authUrl, authData)
            .then(r => {
                //console.log(r);
                const expiration = new Date(new Date().getTime() + r.data.expiresIn * 1000);
                //console.log(expiration);
                localStorage.setItem("token", r.data.idToken);
                localStorage.setItem("expiration", expiration);
                localStorage.setItem("userId", r.data.localId);
                dispatch(authSuccess(r.data.idToken, r.data.localId));
                dispatch(setAuthTimeout(r.data.expiresIn));
            })
            .catch(e => {
                //console.log(e.response.data.error);
                dispatch(authFail(e.response.data.error));
            });
    }
}

//set loading to true
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

//set loading to false, set token, uid
export const authSuccess = (token, uid) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        uid: uid
    }
}

//set loading to false, set error
export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

//set token expire time
export const setAuthTimeout = expireTime => {
    return dispatch => {
        setTimeout(() => dispatch(logout()), expireTime * 1000);
    }
}

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId")
    return dispatch => {
        dispatch({type: actionTypes.LOGOUT});
        dispatch({type: actionTypes.CLEAR_NOTES});
        dispatch({type: actionTypes.CLEAR_SETS});
    }
};

//if auth token is found on local storage, auto log in
export const authInit = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        if (!token) {
            dispatch(logout());
        } else {
            const expiration = new Date(localStorage.getItem("expiration"));
            if (expiration < new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem("userId");
                dispatch(authSuccess(token, userId));
                dispatch(setAuthTimeout((expiration.getTime() - new Date().getTime()) / 1000));
            }

        }
    }
}