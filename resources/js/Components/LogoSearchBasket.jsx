import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import Logo from "../../../public/img/logo_shoptet.svg";
import Button from "react-bootstrap/Button";
import NavLink from "@/Components/NavLink.jsx";


function LogoSearchBasket({auth}) {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showResults, setShowResults] = useState(false);
    const resultsRef = useRef(null);
    const [isWindowOpen, setIsWindowOpen] = useState(false);
    const [basketLength, setBasketLength] = useState(0);
    const [basketItems, setBasketItems] = useState([]);
    const [basketProducts, setBasketProducts] = useState([]);
    const [sessionId, setSessionId] = useState('');


    //Lekéri a termékeket searchTerm alapján
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        fetchProducts();
    }, [searchTerm]);

    const fetchProducts = () => {
        axios.get('/api/products/search', {
            params: {
                searchTerm: searchTerm
            }
        })
            .then(response => {
                setProducts(response.data);
                setShowResults(true);
            })
            .catch(error => {
                console.error(error);
            });
    };
    //Lekéri a termékeket searchTerm alapján END


    //Bezárja a keresési ablakot, ha kívül történik a kattintás
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (resultsRef.current && !resultsRef.current.contains(event.target)) {
            setShowResults(false);
        }
    };
    //Bezárja a keresési ablakot, ha kívül történik a kattintás END

    //Basket open, close
    const openWindow = () => {
        setIsWindowOpen(true);
    };

    const closeWindow = () => {
        setIsWindowOpen(false);
        window.location.reload();
    };
    //Basket open, close END

    //Fetch-eli a kosár elemeit és belerakja basketItems state-be
    useEffect(() => {
        fetchBasketItems(); // Azonnal lekérdezzük a kosár elemeit
        const interval = setInterval(fetchBasketItems, 1000); // 1 másodpercenkénti lekérdezés

        return () => {
            clearInterval(interval); // Tisztítjuk az intervallumot a komponens unmountolásakor
        };
    }, []);

    const fetchBasketItems = () => {

        let userId3 = auth.user ? auth.user.id : 'guest'; // Ha az auth.user értéke null, akkor userId = 'guest'

        axios
            .get(`/basket/items?user_id=${userId3}`)
            .then((response) => {
                setBasketItems(response.data.basket);
            })
            .catch((error) => {
                console.error('Hiba történt a kosár tételek lekérdezésekor', error);
            });
    };

    //Fetch-eli a kosár elemeit és belerakja basketItems state-be END

    //Fetch-eli a basket hosszát
    useEffect(() => {
        fetchBasketLength(); // Azonnal lekérdezzük a kosár hosszát
        const interval = setInterval(fetchBasketLength, 1000); // 1 másodpercenkénti lekérdezés

        return () => {
            clearInterval(interval); // Tisztítjuk az intervallumot a komponens unmountolásakor
        };
    }, []);

    const fetchBasketLength = () => {
        let userId = auth.user ? auth.user.id : 'guest'; // Ha az auth.user értéke null, akkor userId = 'guest'

        axios
            .get(`/basket/length?user_id=${userId}`)
            .then((response) => {
                setBasketLength(response.data.length);
            })
            .catch((error) => {
                console.error('Hiba történt a kosár hosszának lekérdezésekor', error);
            });
    };

    //Fetch-eli a basket hosszát END


    //A kosárban lévő product_id alapján megkeresi a product-okból a terméket
    // useEffect(() => {
    //     fetchProductsInBasket();
    // }, [basketItems]);
    //
    // const fetchProductsInBasket = () => {
    //     const productIds = basketItems.map((item) => ({
    //         product_id: item.product_id,
    //         item_index: item.item_index,
    //     }));
    //
    //     const updatedProducts = productIds.map((productId) => {
    //         const product = products.find((item) => item.id === productId);
    //         return product ? {...product} : null;
    //     });
    //
    //     setBasketProducts(updatedProducts);
    // };
    //A kosárban lévő product_id alapján megkeresi a product-okból a terméket END


    //Kitörli a kosárből az item-et
    const handleRemoveItem = (item) => {
        const itemIndex = item.item_index; // Az item_index értékének megszerzése

        axios.post('/basket/remove', {itemIndex: itemIndex}) // Az item_index elküldése a szervernek
            .then(response => {
                // Sikeres válasz feldolgozása
                console.log(response.data); // Válasz a szerverről
            })
            .catch(error => {
                // Hibakezelés
                console.error(error);
            });
    }
    //Kitörli a kosárből az item-et END

    let totalPrice = 0; // Változó az összeg tárolására


    //Kiüríti a kosarat
    const handleClearCart = () => {
        let userId2 = auth.user ? auth.user.id : 'guest2'; // Ha az auth.user értéke null, akkor userId = 'guest'
        axios.post('/clear-cart', {userId: userId2})
            .then(response => {
                // Sikeres válasz a szerverről
                console.log(response.data);
                // Frissítheted a kosár állapotát vagy a felületet
            })
            .catch(error => {
                // Hiba esetén
                console.error(error);
            });
        window.location.reload();
    }
    //Kiüríti a kosarat END

    useEffect(() => {
        // Hívj meg egy API végpontot vagy használj más módszert a session ID lekérdezésére
        axios.get('/session-id')
            .then(response => {
                setSessionId(response.data.sessionId);
            })
            .catch(error => {
                console.error('Hiba a session ID lekérdezése közben:', error);
            });
    }, []);

    return (
        <>
            <div>
                <p>Session ID: {sessionId}</p>
            </div>
            <br/><br/>
            <p>BASKET ITEM INDEXES</p>
            <div>
                {basketItems.map((item) => (
                    <div key={item.id}>
                        <p>{item.item_index}</p>
                    </div>
                ))}
            </div>
            <div
                className="flex w-full md:w-4/5 lg:w-5/6 mx-auto items-center justify-between egymasAlaKereses divToCenter">
                <a href="/"><img src={Logo} alt="logo" className="my-4 h-1/2 searchMargin"/></a>
                <div className="flex searchMargin">
                    <div>
                        <input
                            value={searchTerm}
                            onChange={handleSearch}
                            onClick={fetchProducts}
                            className="inputMagassag searchBarWidth"
                            type="text"
                            placeholder="Keresett kifejezés"
                            aria-describedby="basic-addon2"
                        />
                        {searchTerm && showResults && (
                            <div ref={resultsRef} className="z-1 searchResults">
                                {products.length > 0 ? (
                                    products.map(product => (
                                        <NavLink href={route('product', product)}
                                                 className="flex w-full items-center hover:bg-gray-100 border-b-0 no-underline text-black"
                                                 key={product.id}>
                                            <div className="flex w-full items-center justify-between px-2 py-1">
                                                <div className="flex items-center">
                                                    <img className="w-10 h-10 mr-2" src={product.thumbnail}
                                                         alt={product.title}/>
                                                    <p className="flex-wrap">{product.title}</p>
                                                </div>
                                                <p>{product.price}$</p>
                                            </div>
                                        </NavLink>
                                    ))
                                ) : (
                                    <p className="border border-black">Nincsenek találatok</p>
                                )}
                            </div>
                        )}
                    </div>
                    <button
                        className="kereses border border-black px-3 ml-2 items-center searchButton bg-blue-500">Keresés
                    </button>
                </div>

                <div
                    id="basketdiv"
                    className="flex items-center searchMargin"
                    onClick={openWindow}
                    style={{cursor: 'pointer'}}
                >
                    <div className="flex relative mr-6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="currentColor"
                            className="bi bi-cart ml-3 hover:text-green-500"
                            viewBox="0 0 16 16"
                        >
                            <path
                                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                            />
                        </svg>
                        <span
                            className="bg-red-500 text-white border-1 border-black rounded-full p-1 flex items-center justify-content-center absolute top-0 right-0 -mt-2 -mr-2 w-6 h-6 z-0">
            {basketLength}
          </span>
                    </div>
                    <Button
                        variant="primary"
                        className="kosar px-3 rounded-0 searchButton border border-black"
                    >
                        Kosár
                    </Button>
                </div>
            </div>
            {isWindowOpen && (
                <div id="kosardiv" className="w-full md:w-4/5 lg:w-5/6 mx-auto border p-4"
                     style={{
                         position: 'absolute',
                         top: '150px',
                         left: 0,
                         width: '100%',
                         minHeight: '200px',
                         height: "auto",
                         backgroundColor: 'white',
                         zIndex: 20,
                     }}
                >
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor"
                             className="bi bi-x-circle text-black-500 cursor-pointer hover:text-red-500"
                             viewBox="0 0 16 16"
                             onClick={closeWindow}
                             style={{marginLeft: 'auto'}}
                        >
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path
                                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </div>

                    {basketItems && basketItems.length === 0 ? (
                        <h1 className="text-center">A kosár üres</h1>
                    ) : (
                        basketItems.map((item, index) => (
                            totalPrice += parseFloat(item.price), // Ár hozzáadása az összeghez
                                <div className="flex items-center justify-center my-1 py-1 w-1/2 border-b m-auto"
                                     key={index}>
                                    <div className="flex w-4/5 items-center">
                                        <img className="w-10 h-10 mr-2" src={item.thumbnail} alt={item.title}/>
                                        <div>{item.title}</div>
                                        <div className="ml-auto">{item.price}$</div>
                                    </div>
                                    <div className="w-1/5 flex justify-content-end">
                                        <button className="border border-red-500 text-red-500 p-1"
                                                onClick={() => handleRemoveItem(item)}
                                        >Törlés
                                        </button>
                                    </div>
                                </div>
                        ))
                    )}
                    {basketItems.length !== 0 && (
                        <>
                            <div className="text-center my-4">
                                <h2>Összesen: {totalPrice}$</h2>
                            </div>

                            <div className="flex justify-content-end">
                                <Button
                                    variant="danger"
                                    onClick={handleClearCart}
                                    className="border rounded-0 p-1">Kosár ürítése</Button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
}

export default LogoSearchBasket;

