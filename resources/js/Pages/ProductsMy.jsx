import React, { useState, useEffect } from 'react';
import Button from "react-bootstrap/Button";
import States4 from "@/Pages/States4.jsx";

export default function ProductsMy({ products3 }) {
    const [products, setProducts] = useState(() => {
        const storedProducts = JSON.parse(localStorage.getItem('myProducts'));
        return storedProducts || products3;
    });

    // Új állapot az aktuális termékek tárolásához, amelyet a gombnyomásra fogsz frissíteni
    const [currentProducts, setCurrentProducts] = useState(products);

    useEffect(() => {
        // Frissítjük a LocalStorage-t, ha megváltozik a termékek állapota
        localStorage.setItem("myProducts", JSON.stringify(currentProducts));
    }, [currentProducts]);

    // Függvény a termékek állapotának frissítésére gombnyomásra
    const handleUpdateProducts = () => {
        const storedProducts = JSON.parse(localStorage.getItem('myProducts'));
        const updatedProducts = storedProducts || products3;
        setCurrentProducts(updatedProducts);
        setProducts(updatedProducts);
    };

    useEffect(() => {
        // Frissítjük a LocalStorage-t, ha megváltozik a termékek állapota
        localStorage.setItem("myProducts", JSON.stringify(products));
    }, [products]);

    return (
        <States4>
            {handleToBasketClick => (
                <div>
                    {products.map((item, index) => (
                        <div className="flex items-center" key={index}>
                            <div className="p-1 m-1">{item.title}</div>
                            <div className="p-1 m-1">{item.stock}</div>
                            <Button
                                className="p-1 m-1"
                                onClick={() => {
                                    if (item.stock > 0) {
                                        handleToBasketClick(item);
                                        // Csökkentjük a product.stock értékét az állapotban
                                        setProducts(prevProducts => {
                                            return prevProducts.map(p =>
                                                p.id === item.id ? { ...p, stock: p.stock - 1 } : p
                                            );
                                        });
                                    }
                                }}
                            >
                                Add to Basket
                            </Button>
                            <Button onClick={handleUpdateProducts}>
                                Update Products
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </States4>
    );
}
