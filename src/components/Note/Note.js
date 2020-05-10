import React, {Component} from "react";
import classes from "./Note.module.css"

class Note extends Component {
    state = {
        id: this.props.id
    }

    offsetX;
    offsetY;

    mouseDownHandler = event => {
        //console.log("mousedown");
        const element = document.getElementById("note" + this.state.id);
        this.offsetX = event.clientX - element.getBoundingClientRect().left;
        this.offsetY = event.clientY - element.getBoundingClientRect().top;

        document.addEventListener("mousemove", this.mouseMoveHandler);
        document.addEventListener("mouseup", this.mouseUpHandler)
    }

    mouseMoveHandler = event => {
        //console.log("mousemove");
        const element = document.getElementById("note" + this.state.id);
        let toSetLeft = event.pageX - this.offsetX;
        let toSetTop = event.pageY - this.offsetY;
        if (toSetLeft < 0) {
            toSetLeft = 0;
        }
        if (toSetTop < 0) {
            toSetTop = 0;
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
                 id={"note" + this.state.id}>
                <div className={classes.Drag} onMouseDown={this.mouseDownHandler}>Drag</div>
                <input type="text" placeholder="Title" className={classes.Title}/>
                <div contentEditable className={classes.Text} data-placeholder={"Write your notes here..."}/>
            </div>
        )
    }
}

export default Note;