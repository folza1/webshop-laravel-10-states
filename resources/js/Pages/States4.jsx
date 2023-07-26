import { useState } from 'react';

function Basket(props) {
    const countItems = (id) => {
        let count = 0;
        for (let i = 0; i < props.product.length; i++) {
            if (props.product[i].id === id) {
                count++;
            }
        }
        return count;
    };

    const seenIds = {};

    return (
        <>
            <h1>In basket: {props.basketCount} DB</h1>
            {props.product && (
                <div>
                    <h1>In basket:</h1>
                    {props.product.map((item, index) => {
                        if (!seenIds[item.id]) {
                            seenIds[item.id] = true;
                            return (
                                <div key={index}>
                                    <p>
                                        {item.title} (Count: {countItems(item.id)})
                                    </p>
                                    <p>{item.stock}</p>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            )}
        </>
    );
}

export default function States4({ children }) {
    const [basketCount, setBasketCount] = useState(0);
    const [product, setProduct] = useState([]);

    const handleToBasketClick = (product) => {
        setProduct((prevProducts) => [...prevProducts, product]);
        setBasketCount((prevBasketCount) => prevBasketCount + 1);
        console.log(product);
    };

    return (
        <div className="App">
            <header className="App-header">
                <Basket basketCount={basketCount} product={product} /> {/* Show Basket komponens */}
            </header>
            {children(handleToBasketClick)} {/* Átadjuk a children komponenseknek a handleToBasketClick callback-et */}
        </div>
    );
}
