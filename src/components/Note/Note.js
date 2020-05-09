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
        element.style.left = event.pageX - this.offsetX + "px";
        element.style.top = event.pageY - this.offsetY + "px";
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
                <div onMouseDown={this.mouseDownHandler}>Click to drag</div>
                <input type="text" placeholder="Title" className={classes.Title}/>
                <div contentEditable className={classes.Text} data-placeholder={"Write your notes here..."}/>
            </div>
        )
    }
}

export default Note;