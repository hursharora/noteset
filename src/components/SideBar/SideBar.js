import React from 'react';
import classes from "./SideBar.module.css";
import {connect} from "react-redux";
import * as setActions from "../../store/actions/setActions";
import * as mainActions from "../../store/actions/mainActions";
import addIcon from "../../assets/add.svg";

class SideBar extends React.Component {

    firstActiveId;
    componentDidMount() {
        //set state.main.activeSpaceId to id of space at position 0
        this.props.onActiveSpaceChange(0, this.firstActiveId);
    }

    render() {
        return (
            <div className={classes.SideBar}>
                <ul>
                    {this.props.spaces.map((sp, index) => {
                        if (sp.position === this.props.activePosition) {
                            this.firstActiveId = sp.id;
                            return <li key={sp.id}
                                       className={classes.ActiveItem}
                                       onClick={() => this.props.onActiveSpaceChange(index, sp.id)}>{sp.name}</li>
                        }
                        return <li key={sp.id}
                                   onClick={() => this.props.onActiveSpaceChange(index, sp.id)}>{sp.name}</li>
                    })}
                </ul>
                <button onClick={() => this.props.onNewSpace(this.props.spaceCount)}
                        className={classes.NewSetButton}
                        disabled={this.props.newSpaceDisabled}><img src={addIcon} alt="New Space"/>
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        spaces: state.set.spaces,
        spaceCount: state.set.spaceCount,
        activePosition: state.main.activeSpacePosition,
        newSpaceDisabled: state.main.newSpaceLoading
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onNewSpace:(spaceCount) => dispatch(setActions.newSpace(spaceCount)),
        onActiveSpaceChange: (newSpaceInd, newSpaceID) => (
            dispatch(mainActions.spaceChange(newSpaceInd, newSpaceID)))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SideBar);