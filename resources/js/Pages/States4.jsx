import {useState} from 'react';

function Basket(props) {
    return (
        <>
            <h1>In basket: {props.myState} DB</h1>
        </>
    );
}

export default function States4({children}) {
    const [myState, setMyState] = useState(0);

    return (
        <div className="App">
            <header className="App-header">
                <Basket myState={myState}/> {/* Show Basket komponent */}
            </header>
            {/*<ProductsMy products3={products3} myState={myState} setMyState={setMyState}/>*/}
            {children}
        </div>
    );
}
