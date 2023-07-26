import { useState, useEffect } from 'react';

function Basket(props) {
    return (
        <>
            <h1>In basket: {props.myState} DB</h1>
            {props.basketItems && (
                <div>
                    <h1>In basket:</h1>
                    {props.basketItems.map((item, index) => (
                        <div key={index}>
                            <p>{item.title}</p>
                            <p>{item.stock-1}</p>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default function States4({ children }) {
    const [myState, setMyState] = useState(0);
    const [basketItems, setBasketItems] = useState(() => {
        const storedItems = localStorage.getItem('basketItems');
        return storedItems ? JSON.parse(storedItems) : [];
    });

    useEffect(() => {
        localStorage.setItem('basketItems', JSON.stringify(basketItems));
    }, [basketItems]);

    const handleToBasketClick = (item) => {
        setMyState((prevMyState) => prevMyState + 1);

        // Hozzáadja az item-et a basketItems tömbhöz
        setBasketItems((prevBasketItems) => [...prevBasketItems, item]);
    };

    return (
        <div className="App">
            <header className="App-header">
                <Basket myState={myState} basketItems={basketItems} /> {/* Show Basket komponens */}
            </header>
            {children(handleToBasketClick)} {/* Átadjuk a children komponenseknek a handleToBasketClick callback-et */}
        </div>
    );
}
