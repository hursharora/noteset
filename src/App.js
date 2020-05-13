import React from 'react';
import MainContainer from "./page-containers/MainContainer/MainContainer";

//sidebar to create new noteset/notespace
//free form notes that can be linked!?
// -auto align notes
//task: to add checkbox
//New Note Button in topBar
//drag note to corner for delete

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
