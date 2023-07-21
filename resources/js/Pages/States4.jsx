import { useState } from 'react';
import Basket from "@/Pages/Basket.jsx";

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

