import React from 'react';
import MainContainer from "./page-containers/MainContainer/MainContainer";
//notes and checklists should be separate
//sidebar to create new noteset/notespace
//free form notes that can be linked!?
// -auto align notes
//task: to add checkbox

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
