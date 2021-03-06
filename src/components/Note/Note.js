import React, {Component} from "react";
import classes from "./Note.module.css"
import {connect} from "react-redux";
import * as noteActions from "../../store/actions/noteActions"
import NoteContentInput from "./NoteContentInput/NoteContentInput";
import DragIndicator from "../../assets/drag_indicator.svg";
import closeIcon from "../../assets/delete_cross.svg";

class Note extends Component {
    offsetX;
    offsetY;

    mouseDownHandler = event => {
        //console.log("mousedown");
        const element = document.getElementById("note" + this.props.id);
        this.offsetX = event.clientX - element.offsetLeft;
        this.offsetY = event.clientY - element.offsetTop;


        document.addEventListener("mousemove", this.mouseMoveHandler);
        document.addEventListener("mouseup", this.mouseUpHandler)
    }

    mouseMoveHandler = event => {
        event.preventDefault();
        //console.log("mousemove");
        const element = document.getElementById("note" + this.props.id);
        //console.log("offsets", this.offsetX, this.offsetY);

        let toSetLeft = event.clientX - this.offsetX;
        let toSetTop = event.clientY - this.offsetY;
        //console.log("tosets", toSetLeft, toSetTop);
        //console.log(element.parentElement.offsetWidth);
        //console.log(toSetLeft);
        //console.log(element.parentElement.clientWidth - this.offsetX);
        //console.log(element.parentElement.clientWidth - 400);
        let elementWidth = element.offsetWidth;
        let elementHeight = element.offsetHeight;
        let parentWidth = element.parentElement.offsetWidth;
        let parentHeight = element.parentElement.offsetHeight;

        if (toSetLeft < 0) {
            toSetLeft = 0;
        }
        if (parentWidth - (toSetLeft + elementWidth) < 0) {
            toSetLeft = parentWidth - elementWidth;
        }
        if (toSetTop < 0) {
            toSetTop = 0;
        }
        if (parentHeight - (toSetTop + elementHeight) < 0) {
            toSetTop = parentHeight - elementHeight;
        }
        element.style.left = toSetLeft + "px";
        element.style.top = toSetTop + "px";
        //console.log(element.style.left);
    }

    mouseUpHandler = () => {
        //console.log("mouseup");
        const element = document.getElementById("note" + this.props.id);
        this.props.onUpdatePosition(element.style.left, element.style.top, this.props.belongsTo, this.props.id, this.props.uid, this.props.token);
        document.removeEventListener("mousemove", this.mouseMoveHandler);
        document.removeEventListener("mouseup", this.mouseUpHandler);
    }

    onTitleChangeLocal = event => {
        this.props.onTitleChange(event.target.value, this.props.belongsTo, this.props.id, this.props.uid, this.props.token);
    }

    onContentChangeLocal = newText => {
        this.props.onContentChange(newText, this.props.belongsTo, this.props.id, this.props.uid, this.props.token);
    }

    render() {
        return (
            <div className={classes.NoteContainer}
                 id={"note" + this.props.id} style={{left: this.props.xPos, top: this.props.yPos}}>
                <div className={classes.ActionsContainer}>
                    <button className={classes.CloseButton}
                            onClick={() => this.props.onDeleteNote(this.props.belongsTo, this.props.id, this.props.uid, this.props.token)}>
                        <img src={closeIcon} alt="Close"/>
                    </button>
                    <div className={classes.Drag} onMouseDown={this.mouseDownHandler}>
                        <img src={DragIndicator} alt="drag"/>
                    </div>
                </div>

                <input type="text"
                       placeholder="Title"
                       className={classes.Title}
                       onChange={this.onTitleChangeLocal}
                       value={this.props.title}/>
                <NoteContentInput content={this.props.content}
                                  contentChange={this.onContentChangeLocal}
                                  noteID={this.props.id}
                                  spaceID={this.props.belongsTo}/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdatePosition: (newX, newY, belongsTo, toUpdateID, uid, token) => (
            dispatch(noteActions.updatePosition(newX, newY, belongsTo, toUpdateID, uid, token))),
        onTitleChange: (newTitle, belongsTo, toUpdateID, uid, token) => (
            dispatch(noteActions.updateTitle(newTitle, belongsTo, toUpdateID, uid, token))),
        onContentChange: (newContent, belongsTo, toUpdateID, uid, token) => (
            dispatch(noteActions.updateContent(newContent, belongsTo, toUpdateID, uid, token))),
        onDeleteNote: (spaceID, noteID, uid, token) => (
            dispatch(noteActions.deleteNote(spaceID, noteID, uid, token)))

    }
}

const mapStateToProps = state => {
    return {
        uid: state.main.uid,
        token: state.main.authToken
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Note);