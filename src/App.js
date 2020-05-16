import React from 'react';
import MainContainer from "./page-containers/MainContainer/MainContainer";

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
                <MainContainer/>
            </div>
        );
    }
}

export default App;
