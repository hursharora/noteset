import React from 'react';
import MainContainer from "./page-containers/MainContainer/MainContainer";
import {Switch, Route} from "react-router-dom";
import Authentication from "./page-containers/Authentication/Authentication";
//sidebar to create new noteset/notespace
//free form notes that can be linked!?
// -auto align notes
//task: to add checkbox
//drag note to corner for delete
//disable new set button while loading!

class App extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path={"/signin"} component={Authentication}/>
                    <Route path={"/"} component={MainContainer}/>
                </Switch>
            </div>
        );
    }
}

export default App;
