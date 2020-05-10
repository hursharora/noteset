import React from 'react';
import classes from "./TopBar.module.css"

const TopBar = () => {
    return (
        <nav className={classes.TopBar}>
            <h2 className={classes.TitleText}>NoteSet</h2>
        </nav>
    );
};


export default TopBar;