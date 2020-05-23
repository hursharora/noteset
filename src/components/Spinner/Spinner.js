import React from "react";
import classes from "./Spinner.module.css"

const Spinner = props => {
    let usedClasses = [classes.Loader];
    if (props.main) {
        usedClasses.push(classes.MainSpinner);
    }
    return (
        <div className={usedClasses.join(" ")}>Loading...</div>
    )
}

export default Spinner;