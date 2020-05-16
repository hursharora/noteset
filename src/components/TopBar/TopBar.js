import React from 'react';
import classes from "./TopBar.module.css"
import * as noteActions from "../../store/actions/noteActions"
import {connect} from "react-redux";

const TopBar = props => {
    return (
        <nav className={classes.TopBar}>
            <div className={classes.Placeholder}/>
            <h2 className={classes.TitleText}>NoteSet</h2>
            <button className={classes.NewNote}
                    onClick={() => props.onNewNote(props.currActiveSpace)}>New Note</button>
        </nav>
    );
};

const mapStateToProps = state => {
    return {
        currActiveSpace: state.main.activeSpaceID
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onNewNote: (activeSpaceID) => dispatch(noteActions.newNote(activeSpaceID))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TopBar);