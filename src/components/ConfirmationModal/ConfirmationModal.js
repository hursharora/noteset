import React from 'react';
import DoneIcon from "../../assets/done.svg";
import CrossIcon from "../../assets/delete_cross.svg";
import classes from "./ConfirmationModal.module.css"
import BackDrop from "./BackDrop/BackDrop";
import * as setActions from "../../store/actions/setActions";
import {connect} from "react-redux";

const ConfirmationModal = props => {
    return (
        <>
            <BackDrop clicked={props.cancelDelete}/>
            <div className={classes.ConfirmationModal}>
                <h4>
                    All notes in this set will be deleted. <br/>
                    Are you sure you want to continue?
                </h4>
                <button className={classes.ConfirmationModalButton}
                        onClick={props.cancelDelete}>
                    <img src={CrossIcon} alt="Cancel"/>
                </button>
                <button className={classes.ConfirmationModalButton}
                        onClick={() => props.continueDelete(props.spaceToDeleteID)}>
                    <img src={DoneIcon} alt="Continue"/>
                </button>
            </div>
        </>
    );
};

const mapStateToProps = state => {
    return {
        spaceToDeleteID: state.set.deletingSpace
    }
}

const mapDispatchToProps = dispatch => {
    return {
        cancelDelete: () => dispatch(
            setActions.deleteSpace(null, null)
        ),
        continueDelete: (spaceID) => dispatch(
            setActions.continueDeleteSpace(spaceID)
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationModal);