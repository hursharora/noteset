import React from 'react';
import MainContainer from "./page-containers/MainContainer/MainContainer";
import {Switch, Route, Redirect} from "react-router-dom";
import Authentication from "./page-containers/Authentication/Authentication";
import {connect} from "react-redux";
import * as mainActions from "./store/actions/mainActions";

//notelinks?

class App extends React.Component {
    componentDidMount() {
        this.props.authInit();
    }


    render() {
        let loggedInRoutes = (
            <>
                <Route path={"/"} exact component={MainContainer}/>
                <Redirect to={"/"}/>
            </>)

        let authRoutes = (
            <>
                <Route path={"/signin"} exact component={Authentication}/>
                <Redirect to={"/signin"}/>
            </>
        )

        return (
            <div>
                <Switch>
                    {this.props.loggedIn ? loggedInRoutes : authRoutes}
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.main.authToken !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authInit: () => dispatch(mainActions.authInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
