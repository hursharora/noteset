import React, {Component} from 'react';
import classes from "./NoteContentInput.module.css"
import ContentEditable from "react-contenteditable";

class NoteContentInput extends Component {
    state = {
        content: "",
    }

    checkboxes = [];

    componentDidMount() {
        this.setState({content: this.props.content})
    }

    contentUpdateHandler = event => {
        let newText = event.target.value;
        let replaced = false;
        let potentialID = + Date.now();
        newText = newText.replace(/task:/, token => {
            replaced = true;
            return "<input type='checkbox' id=input_" + potentialID  + ">&nbsp;"; //need to include note id in id.
        });

        this.setState({content: newText});
        this.props.contentChange(newText);

        if (replaced) {
            //console.log(potentialID);
            let newCheckBox = {id: potentialID, listener: false, checked: false};
            this.checkboxes.push(newCheckBox);
        }
    }

    checkBoxClickedHandler = (checkboxID) => {
        console.log("checked element", checkboxID);
        this.checkboxes = this.checkboxes.map(el => {
            if (el.id === checkboxID) {
                return {
                    ...el,
                    checked: !el.checked
                }
            }
            return el;
        })
    }


    render() {
        let toRemove = [];
        this.checkboxes.forEach(el => {
            let docSearch = document.getElementById("input_" + el.id);
            if (docSearch != null && !el.listener) {
                docSearch.addEventListener("change", () => this.checkBoxClickedHandler(el.id));
                el.listener = true;
            } else if (docSearch == null) {
                toRemove.push(el.id);
            }
            if (docSearch != null && el.checked) {
                docSearch.checked = true;
            }
        })

        //if a checkbox id is not found on the dom, remove it from the list of checkboxes
        if (toRemove.length) {
            this.checkboxes = this.checkboxes.filter(el => !toRemove.includes(el.id));
        }

        //console.log(this.state.content, "inner");
        return (
            <ContentEditable
                data-placeholder={"Write your notes here..."}
                className={classes.NoteContentInputList}
                onChange={this.contentUpdateHandler}
                html={this.state.content}
            />
        );
    }
}


export default NoteContentInput;