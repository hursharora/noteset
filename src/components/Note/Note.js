import React, {Component} from "react";
import classes from "./Note.module.css"

class Note extends Component {
    //random color changer
    render() {
        return (
            <div className={classes.NoteContainer}>
                <div>toolbar: drag, link </div>
                <input type="text" placeholder="Title" className={classes.Title}/>
                <div contentEditable placeholder="Edit this text"/>
            </div>
        )
    }
}

export default Note;