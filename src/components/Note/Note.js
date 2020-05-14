import React, {Component} from "react";
import classes from "./Note.module.css"

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
    }

    mouseUpHandler = () => {
        //console.log("mouseup");
        document.removeEventListener("mousemove", this.mouseMoveHandler);
        document.removeEventListener("mouseup", this.mouseUpHandler);
    }

    render() {
        return (
            <div className={classes.NoteContainer}
                 id={"note" + this.props.id}>
                <div className={classes.Drag} onMouseDown={this.mouseDownHandler}>Drag</div>
                <input type="text" placeholder="Title" className={classes.Title}/>
                <div contentEditable className={classes.Text} data-placeholder={"Write your notes here..."}/>
            </div>
        )
    }
}

export default Note;