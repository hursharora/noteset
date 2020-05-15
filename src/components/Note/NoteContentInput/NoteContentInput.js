import React, {Component} from 'react';
import classes from "./NoteContentInput.module.css"

class NoteContentInput extends Component {
    render() {
        return (
            <div contentEditable
                 className={classes.NoteContentInputList}
                 data-placeholder={"Write your notes here..."}
                 onBlur={this.props.contentChange}
                 suppressContentEditableWarning={true}
            >{this.props.content}</div>
        );
    }
}

export default NoteContentInput;