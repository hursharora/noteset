import React, {Component} from 'react';
import classes from "./Authentication.module.css"
import SignInBox from "../../components/SignInBox/SignInBox";

class Authentication extends Component {
    render() {
        return (
            <div className={classes.Authentication}>
                <h1 className={classes.Title}>NoteSet</h1>
                <SignInBox/>
            </div>
        );
    }
}

export default Authentication;