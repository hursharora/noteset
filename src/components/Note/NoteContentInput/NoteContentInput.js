import React, {Component} from 'react';
import classes from "./NoteContentInput.module.css"
import ContentEditable from "react-contenteditable";

class NoteContentInput extends Component {
    render() {
        return (
            <ContentEditable
                data-placeholder={"Write your notes here..."}
                className={classes.NoteContentInputList}
                onChange={this.props.contentChange}
                html={this.props.content}
            />
        );
    }
}

export default NoteContentInput;