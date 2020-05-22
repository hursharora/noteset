import React from 'react';
import classes from "./TopBar.module.css";
import * as noteActions from "../../store/actions/noteActions";
import * as mainActions from "../../store/actions/mainActions";
import {connect} from "react-redux";

const TopBar = props => {
    return (
        <nav className={classes.TopBar}>
            <div className={classes.Placeholder}/>
            <h2 className={classes.TitleText}>NoteSet</h2>
            <button className={classes.NewNote}
                    disabled={props.newNoteDisabled || !props.currActiveSpace}
                    onClick={() => props.onNewNote(props.currActiveSpace, props.uid, props.token)}>New Note</button>
            <button className={classes.LogoutButton} onClick={props.logout}>Logout</button>
        </nav>
    );
};

const mapStateToProps = state => {
    return {
        currActiveSpace: state.main.activeSpaceID,
        newNoteDisabled: state.main.newNoteLoading,
        uid: state.main.uid,
        token: state.main.authToken
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onNewNote: (activeSpaceID, uid, token) => dispatch(noteActions.newNote(activeSpaceID, uid, token)),
        logout: () => dispatch(mainActions.logout())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TopBar);