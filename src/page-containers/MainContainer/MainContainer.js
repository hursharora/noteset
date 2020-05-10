import React from 'react';
import TopBar from "../../components/TopBar/TopBar";
import SideBar from "../../components/SideBar/SideBar";
import NoteContainer from "../../components/NoteContainer/NoteContainer";
import classes from "./MainContainer.module.css"

const MainContainer = props => {
    return (
        <div className={classes.MainContainer}>
            <TopBar/>
            <div className={classes.ContainerRow}>
                <SideBar/>
                <NoteContainer/>
            </div>
        </div>
    );
};


export default MainContainer;