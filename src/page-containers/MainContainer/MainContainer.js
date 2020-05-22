import React from 'react';
import TopBar from "../../components/TopBar/TopBar";
import SideBar from "../../components/SideBar/SideBar";
import NoteContainer from "../../components/NoteContainer/NoteContainer";
import classes from "./MainContainer.module.css"
import {connect} from "react-redux"
import Spinner from "../../components/Spinner/Spinner";
import * as mainActions from "../../store/actions/mainActions";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";

class MainContainer extends React.Component {
    componentDidMount() {
        this.props.initLoad(this.props.uid, this.props.token);
    }

    render() {
        let content = <Spinner/>
        if (!this.props.loading) {
            content = (
                <>
                    {this.props.deletingSpace ? <ConfirmationModal/> : null}
                    <TopBar/>
                    <div className={classes.ContainerRow}>
                        <SideBar/>
                        <NoteContainer/>
                    </div>
                </>
            )
        }
        return (
            <div className={classes.MainContainer}>
                {content}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initLoad: (uid, authToken) => dispatch(mainActions.initLoad(uid, authToken))
    }
}

const mapStateToProps = state => {
    return {
        loading: state.main.initLoading,
        deletingSpace: state.set.deletingSpace,
        uid: state.main.uid,
        token: state.main.authToken
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);