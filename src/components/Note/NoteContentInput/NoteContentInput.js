import React, {Component} from 'react';
import classes from "./NoteContentInput.module.css"
import ContentEditable from "react-contenteditable";

//Very proud of this component, easily the heart of the project.
//Checkboxes are added and checked using clever string manipulation

class NoteContentInput extends Component {
    state = {
        content: ""
    }


    componentDidMount() {
        this.setState({content: this.props.content})
    }

    //detects when the user has entered "task:" and replaces it with a checkbox,
    //the new checkbox is added to the checkboxes array and all the content is saved to firebase/redux store
    contentUpdateHandler = event => {
        let newText = event.target.value;
        let potentialID = + Date.now();
        newText = newText.replace(/task:/, "<input type='checkbox' id=input_" + potentialID  + ">&nbsp;");

        this.setState({content: newText});
        this.props.contentChange(newText);
    }

    //when a checkbox is clicked, the checked property is added to the check box in the content string
    // and vice versa if it is already checked. Firebase/redux store are updated.
    checkboxListener = event => {
        if (event.target.type === "checkbox") {
            let replacingContent = this.state.content;
            let checkboxID = event.target.id;
            let toReplace;
            let replacement;
            if (event.target.checked) {
                //console.log("checked", event.target.id);
                toReplace = "id=\"" + checkboxID + "\"";
                replacement = toReplace + " checked";
            } else {
                //console.log("unchecked", event.target.id);
                toReplace = "id=\"" + checkboxID + "\" checked";
                replacement = "id=\"" + checkboxID + "\"";
            }

            replacingContent = replacingContent.replace(toReplace, replacement);
            this.setState({content: replacingContent});
            this.props.contentChange(replacingContent);
        }
    }


    render() {
        //console.log(this.state.content, "inner");
        //a content editable div is used to render the html
        //making your own content editable div has TONS of problems, luckily I was able to
        //use this content editable div library.
        return (
            <div onClick={this.checkboxListener}>
                <ContentEditable
                    data-placeholder={"Write your notes here..."}
                    className={classes.NoteContentInputList}
                    onChange={this.contentUpdateHandler}
                    html={this.state.content}
                />
            </div>

        );
    }
}


export default NoteContentInput;