import React from 'react';
import Note from "./components/Note/Note";

//notes and checklists should be separate
//sidebar to create new noteset/notespace
//free form notes that can be linked!?
// -auto align notes

class App extends React.Component {
    render() {
        return (
            <div>
                <Note id={0}/>
                <Note id={1}/>
            </div>
        );
    }
}

export default App;
