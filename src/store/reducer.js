const initialState = {
    noteSpaces: [
        {name: "Noteset 1", notes: [{title: "", id: 0, xPos: 0, yPos: 0, content: ""}]},
        {name: "Noteset 2", notes: []}
    ],
    auth: true
}

//notespace reducer, notes reducer?
const reducer = (state = initialState, action) => {
    return state;
}

export default reducer;