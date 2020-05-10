import React, {Component} from 'react';
import Note from "../Note/Note";
import classes from "./NoteContainer.module.css"

class NoteContainer extends Component {
    render() {
        return (
            <div className={classes.NoteContainer}>
                <Note id={1}/>
                <Note id={2}/>
            </div>
        );
    }
}

export default NoteContainer;