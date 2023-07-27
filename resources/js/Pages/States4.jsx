import { useState, useEffect, useMemo } from 'react';

function Basket(props) {
    const [groupedItems, setGroupedItems] = useState({});

    useEffect(() => {
        const counts = {};

        if (props.basketItems) {
            props.basketItems.forEach((item) => {
                if (!counts[item.id]) {
                    counts[item.id] = {
                        ...item,
                        count: 1,
                    };
                } else {
                    counts[item.id].count++;
                }
            });
        }

        setGroupedItems(counts);
    }, [props.basketItems]);

    // Függvény a groupedItem törléséhez a groupedItems tömbből
    const handleDeleteItem = (itemId) => {
        props.setBasketItems((prevBasketItems) => {
            const updatedBasketItems = prevBasketItems.filter((item) => item.id !== itemId);
            return updatedBasketItems;
        });

        if (props.basketItems) {
            const itemToDelete = props.basketItems.find((item) => item.id === itemId);
            if (itemToDelete) {
                // Módosítjuk a myProducts stock értékét a törléssel
                const myProducts = JSON.parse(localStorage.getItem('myProducts'));
                const productToUpdate = myProducts.find((product) => product.id === itemId);
                if (productToUpdate) {
                    productToUpdate.stock += groupedItems[itemId].count;
                    localStorage.setItem('myProducts', JSON.stringify(myProducts));
                }
            }
        }
    };

    return (
        <>
            <h1>In basket: {props.myState} DB</h1>
            {props.basketItems && (
                <div>
                    <h1>In basket:</h1>
                    {Object.values(groupedItems).map((groupedItem, index) => (
                        <div key={index} className="flex">
                            <p className="m-2">{groupedItem.title}</p>
                            {groupedItem.count > 1 && <p className="m-2">Darab: {groupedItem.count}</p>}
                            <button className="m-2" onClick={() => handleDeleteItem(groupedItem.id)}>Delete</button>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default function States4({ children }) {
    const [basketItems, setBasketItems] = useState(() => {
        const storedItems = localStorage.getItem('basketItems');
        return storedItems ? JSON.parse(storedItems) : [];
    });

    useEffect(() => {
        localStorage.setItem('basketItems', JSON.stringify(basketItems));
    }, [basketItems]);

    const handleToBasketClick = (item) => {
        setBasketItems((prevBasketItems) => [...prevBasketItems, item]);
    };

    return (
        <div className="App">
            <header className="App-header">
                <Basket basketItems={basketItems} setBasketItems={setBasketItems} myState={basketItems.length} /> {/* Show Basket komponens */}
            </header>
            {children(handleToBasketClick)} {/* Átadjuk a children komponenseknek a handleToBasketClick callback-et */}
        </div>
    );
}
