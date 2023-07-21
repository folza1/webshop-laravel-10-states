import { useState } from 'react';

function Basket(props) {
    return (
        <>
            <h1>In basket: {props.myState} DB</h1>
        </>
    );
}

export default function States4({ children }) {
    const [myState, setMyState] = useState(0);

    const handleToBasketClick = () => {
        setMyState(myState + 1);
    };

    return (
        <div className="App">
            <header className="App-header">
                <Basket myState={myState} /> {/* Show Basket komponens */}
            </header>
            {children(handleToBasketClick)} {/* Átadjuk a children komponenseknek a handleToBasketClick callback-et */}
        </div>
    );
}

