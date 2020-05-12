import React from 'react';
import classes from "./SideBar.module.css"
import {connect} from "react-redux";

const SideBar = props => {
    return (
        <div className={classes.SideBar}>
            <ul>
                {props.spaces.map(sp => (
                    <li key={sp.id}>{sp.name}</li>
                ))}
            </ul>
            <button onClick={props.onNewSpace} className={classes.NewSetButton}>New Set</button>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        spaces: state.spaces
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onNewSpace:() => dispatch({type: "NEW_SPACE"})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SideBar);