import React from 'react';
import DoneIcon from "../../assets/done.svg";
import CrossIcon from "../../assets/delete_cross.svg";
import classes from "./ConfirmationModal.module.css"
import BackDrop from "./BackDrop/BackDrop";

const ConfirmationModal = props => {
    return (
        <>
            <BackDrop/>
            <div className={classes.ConfirmationModal}>
                <h4>
                    All notes in this set will be deleted. <br/>
                    Are you sure you want to continue?
                </h4>
                <button className={classes.ConfirmationModalButton}>
                    <img src={CrossIcon} alt="Cancel"/>
                </button>
                <button className={classes.ConfirmationModalButton}>
                    <img src={DoneIcon} alt="Continue"/>
                </button>
            </div>
        </>
    );
};


export default ConfirmationModal;