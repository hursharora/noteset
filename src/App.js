import React from 'react';
import NoteContainer from "./components/NoteContainer/NoteContainer";
import TopBar from "./components/TopBar/TopBar";

//notes and checklists should be separate
//sidebar to create new noteset/notespace
//free form notes that can be linked!?
// -auto align notes
//task: to add checkbox

class App extends React.Component {
    render() {
        return (
            <div>
                <TopBar/>
                <NoteContainer/>
            </div>
        );
    }
}

export default App;
