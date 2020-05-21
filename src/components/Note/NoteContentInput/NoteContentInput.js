import React, {Component} from 'react';
import classes from "./NoteContentInput.module.css"
import ContentEditable from "react-contenteditable";

//Very proud of this component, easily the heart of the project.
//Checkboxes are added, saved and loaded using clever string manipulation and
//their statuses are saved to the normal content area!

class NoteContentInput extends Component {
    state = {
        content: ""
    }

    checkboxes = [];

    //Once mounted, the content string is searched for a 13 digit number (the ID of the checkbox)
    //the found id's are added to the checkboxes array.
    componentDidMount() {
        this.setState({content: this.props.content})
        const searchIDs = /\d{13}/g;
        let retrievedIDs = this.props.content.match(searchIDs);
        if (retrievedIDs != null) {
            this.checkboxes = retrievedIDs.map(el => (
                {id: el, listener: false}
            ));
        }
    }

    //detects when the user has entered "task:" and replaces it with a checkbox,
    //the new checkbox is added to the checkboxes array and all the content is saved to firebase/redux store
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
            let newCheckbox = {id: potentialID, listener: false};
            this.checkboxes.push(newCheckbox);
        }
    }

    //when a checkbox is clicked, the checked property is added to the check box in the content string
    // and vice versa if it is already checked. Firebase/redux store are updated.
    checkBoxClickedHandler = (checkboxID) => {
        //console.log("checked element", checkboxID);
        let replacingContent = this.state.content;

        let testReplace = "id=\"input_" + checkboxID + "\" checked";
        let toReplace = "id=\"input_" + checkboxID + "\"";
        let replacement = toReplace + " checked";
        if (replacingContent.search(testReplace) !== -1) { //if already checked
            let t = toReplace;
            toReplace = replacement;
            replacement = t;
        }

        replacingContent = replacingContent.replace(toReplace, replacement);

        this.setState({content: replacingContent});
        this.props.contentChange(replacingContent);
    }

    //maybe add in the future, deleted checkboxes will stay in checkbox array for now
    // cleanRemovedCheckboxes = () => {
    //     this.checkboxes = this.checkboxes.filter(el => {
    //         if (document.body.contains(document.getElementById("input_" + el.id))) {
    //             return true;
    //         }
    //         console.log("remove", el.id);
    //         return false;
    //     })
    // }

    render() {
        //click listeners are added to the checkboxes once they are rendered.
        if (this.checkboxes) {
            this.checkboxes.forEach(el => {
                let docSearch = document.getElementById("input_" + el.id);
                if (docSearch != null && !el.listener) {
                    //console.log("found", el.id);
                    docSearch.addEventListener("change", () => this.checkBoxClickedHandler(el.id));
                    el.listener = true;
                    //this.cleanRemovedCheckboxes();
                }
            })
        }

        //console.log(this.state.content, "inner");
        //a content editable div is used to render the html
        //making your own content editable div has TONS of problems, luckily I was able to
        //use this content editable div library.
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