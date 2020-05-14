import React, {Component} from 'react';
import Note from "../Note/Note";
import classes from "./NoteContainer.module.css";
import {connect} from "react-redux";

class NoteContainer extends Component {
    render() {
        let notesMapped = null;
        let currNotes = this.props.allNotes[this.props.activeSpaceID];

        if (this.props.activeSpaceID && currNotes !== undefined) {
            notesMapped = currNotes.map(el => (
                <Note id={el.id}/>
            ))
        }


        return (
            <div className={classes.NoteContainer}>
                {/*<Note id={1}/>*/}
                {/*<Note id={2}/>*/}
                {notesMapped}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        activeSpaceID: state.main.activeSpaceID,
        allNotes: state.note
    }
}


export default connect(mapStateToProps)(NoteContainer);