import React from 'react';
import classes from "./SideBar.module.css"
import {connect} from "react-redux";
import * as actions from "../../store/actions"

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
                <button onClick={this.props.onNewSpace} className={classes.NewSetButton}>New Set</button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        spaces: state.set.spaces,
        activePosition: state.main.activeSpacePosition
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onNewSpace:() => dispatch({type: actions.NEW_SPACE}),
        onActiveSpaceChange: (newSpaceInd, newSpaceID) => dispatch({type: actions.SPACE_CHANGE,
                                                                    newInd: newSpaceInd,
                                                                    newID: newSpaceID})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SideBar);