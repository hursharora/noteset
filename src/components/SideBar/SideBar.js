import React from 'react';
import classes from "./SideBar.module.css";
import {connect} from "react-redux";
import * as setActions from "../../store/actions/setActions";
import * as mainActions from "../../store/actions/mainActions";
import addIcon from "../../assets/add.svg";
import deleteIcon from "../../assets/delete_cross.svg";
import confirmAdd from "../../assets/done.svg";

class SideBar extends React.Component {
    state = {
        naming: false,
        name: null
    }

    firstActiveId;

    componentDidMount() {
        //set state.main.activeSpaceId to id of space at position 0
        this.props.onActiveSpaceChange(0, this.firstActiveId);
    }

    toggleNamingHandler = () => {
        this.setState(prevState => (
            {naming: !prevState.naming}
        ));
    }

    inputChangeHandler = (event) => {
        this.setState({name: event.target.value})
    }

    confirmAddSpaceHandler = event => {
        this.props.onNewSpace(this.state.name, this.props.uid, this.props.token);
        this.setState({naming: false});
    }

    confirmAddSpaceHandlerInput = event => {
        if (event.keyCode === 13) {
            this.confirmAddSpaceHandler();
        }
    }

    render() {
        let newSpace = (
            <button onClick={this.toggleNamingHandler}
                    className={classes.NewSetButton}
                    disabled={this.props.newSpaceDisabled}><img src={addIcon} alt="New Space"/>
            </button>
        );

        if (this.state.naming) {
            newSpace = (
                <div className={classes.InputContainer}>
                    <input type="text"
                           autoFocus
                           placeholder="New set name..."
                           onChange={this.inputChangeHandler}
                           className={classes.Input}
                           maxLength={30}
                           onKeyUp={this.confirmAddSpaceHandlerInput}/>
                    <button className={classes.InputButton}
                            onClick={this.confirmAddSpaceHandler}>
                        <img src={confirmAdd} alt="Add"/>
                    </button>
                    <button onClick={this.toggleNamingHandler}
                            className={classes.InputButton}>
                        <img src={deleteIcon} alt="Cancel"/>
                    </button>
                </div>
            )
        }

        return (
            <div className={classes.SideBar}>
                <ul>
                    {this.props.spaces.map((sp, index) => {
                        if (index === this.props.activePosition) {
                            this.firstActiveId = sp.id;
                        }
                        return (
                            <li key={sp.id}
                                className={index === this.props.activePosition ? classes.ActiveItem : null}
                                onClick={() => this.props.onActiveSpaceChange(index, sp.id)}>
                                {sp.name}
                                <button className={classes.DeleteButton}
                                        onClick={() => this.props.onDeleteSpace(sp.id)}>
                                    <img src={deleteIcon} alt="Delete"/>
                                </button>
                            </li>
                        )
                    })}
                </ul>
                {newSpace}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        spaces: state.set.spaces,
        spaceCount: state.set.spaceCount,
        activePosition: state.main.activeSpacePosition,
        newSpaceDisabled: state.main.newSpaceLoading,
        uid: state.main.uid,
        token: state.main.authToken
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onNewSpace: (newSpaceName, uid, token) => dispatch(setActions.newSpace(newSpaceName, uid, token)),
        onActiveSpaceChange: (newSpaceInd, newSpaceID) => (
            dispatch(mainActions.spaceChange(newSpaceInd, newSpaceID))),
        onDeleteSpace: (deleteSpaceID) => (
            dispatch(setActions.deleteSpace(deleteSpaceID))
        )
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SideBar);