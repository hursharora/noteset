import React from 'react';
import classes from "./SideBar.module.css"

const SideBar = props => {
    return (
        <div className={classes.SideBar}>
            <ul>
                <li>Noteset 1</li>
                <li>Noteset 2</li>
            </ul>
        </div>
    );
};


export default SideBar;