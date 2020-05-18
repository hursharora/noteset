import React, {Component} from 'react';
import Note from "../Note/Note";
import classes from "./NoteContainer.module.css";
import {connect} from "react-redux";

class NoteContainer extends Component {
    render() {
        let notesMapped = <h1 className={classes.EmptyContainerMessage}>Add some notes!</h1>;

        let currNotes = this.props.allNotes[this.props.activeSpaceID];
        if (this.props.activeSpaceID && currNotes !== undefined && currNotes.length > 0) {
            notesMapped = currNotes.map(el => (
                <Note key={el.id}
                      id={el.id}
                      belongsTo={this.props.activeSpaceID}
                      xPos={el.xPos}
                      yPos={el.yPos}
                      title={el.title}
                      content={el.content}/>
            ))
        }
        if (!this.props.activeSpaceID) {
            notesMapped = <h1 className={classes.EmptyContainerMessage}>Select a set</h1>;
        }


        return (
            <div className={classes.NoteContainer}>
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