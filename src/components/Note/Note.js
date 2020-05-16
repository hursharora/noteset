import React, {Component} from "react";
import classes from "./Note.module.css"
import {connect} from "react-redux";
import * as noteActions from "../../store/actions/noteActions"
import NoteContentInput from "./NoteContentInput/NoteContentInput";

class Note extends Component {
    //manage title and content state locally and only update redux state on occasion to
    //improve performance TODO
    state = {
        title: this.props.title,
        content: this.props.content
    }

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
        //console.log("mousemove");
        const element = document.getElementById("note" + this.props.id);
        let toSetLeft = event.clientX - this.offsetX;
        let toSetTop = event.clientY - this.offsetY;
        //console.log(toSetLeft);
        //console.log(element.parentElement.clientWidth - this.offsetX);
        //console.log(element.parentElement.clientWidth - 400);

        if (toSetLeft < 0) {
            toSetLeft = 0;
        }
        if (toSetLeft > element.parentElement.clientWidth - 400) {
            toSetLeft = element.parentElement.clientWidth - 400;
        }
        if (toSetTop < 0) {
            toSetTop = 0;
        }
        if (toSetTop > element.parentElement.clientHeight - 200) {
            toSetTop = element.parentElement.clientHeight - 200;
        }
        element.style.left = toSetLeft + "px";
        element.style.top = toSetTop + "px";
        //console.log(element.style.left);
    }

    mouseUpHandler = () => {
        //console.log("mouseup");
        const element = document.getElementById("note" + this.props.id);
        this.props.onUpdatePosition(element.style.left, element.style.top, this.props.belongsTo, this.props.id);
        document.removeEventListener("mousemove", this.mouseMoveHandler);
        document.removeEventListener("mouseup", this.mouseUpHandler);
    }

    onTitleChangeLocal = event => {
        this.props.onTitleChange(event.target.value, this.props.belongsTo, this.props.id);
    }

    onContentChangeLocal = event => {
        //console.log(event.target.innerHTML);
        this.props.onContentChange(event.target.innerHTML, this.props.belongsTo, this.props.id);
    }

    render() {

        return (
            <div className={classes.NoteContainer}
                 id={"note" + this.props.id} style={{left: this.props.xPos, top: this.props.yPos}}>
                <div className={classes.Drag} onMouseDown={this.mouseDownHandler}>Drag</div>
                <input type="text"
                       placeholder="Title"
                       className={classes.Title}
                       onChange={this.onTitleChangeLocal}
                       value={this.props.title}/>
                <NoteContentInput content={this.props.content}
                                  contentChange={this.onContentChangeLocal}/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdatePosition: (newX, newY, belongsTo, toUpdateID) => (
            dispatch(noteActions.updatePosition(newX, newY, belongsTo, toUpdateID))),
        onTitleChange: (newTitle, belongsTo, toUpdateID) => (
            dispatch(noteActions.updateTitle(newTitle, belongsTo, toUpdateID))),
        onContentChange: (newContent, belongsTo, toUpdateID) => (
            dispatch(noteActions.updateContent(newContent, belongsTo, toUpdateID)))

    }
}

export default connect(null, mapDispatchToProps)(Note);