import {Head} from '@inertiajs/react';
import React, {useEffect, useState} from 'react';
import Welcome from "@/Pages/Welcome.jsx";
import axios from 'axios';

export default function Products({auth, products}) {
    const [isKosarbaKattintva, setIsKosarbaKattintva] = useState(false);
    const [basketLength, setBasketLength] = useState(0);

    const toggleKosarbaAblak = () => {
        setIsKosarbaKattintva(!isKosarbaKattintva);
    };
    const handleClick = (item) => {
        toggleKosarbaAblak();
        const requestData = {
            user_id: auth.user ? auth.user.id : 'guest',
            product_id: item.id,
            title: item.title,
            description: item.description,
            price: item.price,
            discount_percentage: item.discountPercentage,
            rating: item.rating,
            stock: item.stock,
            brand: item.brand,
            category: item.category,
            thumbnail: item.thumbnail,
            images: item.images,
            akcios: item.akcios,
            ujdonsag: item.ujdonsag,
            kiarusitas: item.kiarusitas,

        };
        axios
            .post('/basket', requestData)
            .then((response) => {
                console.log('Sikeresen hozzáadva a kosárhoz', response.data);
                fetchBasketLength(); // Fetch basket length after successful post
            })
            .catch((error) => {
                console.error('Hiba történt a kosárhoz adáskor', error);
                // Hiba kezelése
            });
    };

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

    useEffect(() => {
        fetchBasketLength();
    }, []);

    return (
        <Welcome auth={auth} children2={<><h1></h1></>}>
            {handleToBasketClick => (
                <div className="flex flex-wrap justify-center w-full md:w-4/5 lg:w-5/6 mx-auto mt-8">
                    {products.map((item, index) => (
                        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2 py-6 border-l border-r mb-4 h-auto"
                             key={item.id}>
                            <div className="divMagassag">
                                <div className="flex justify-center items-center">
                                    <img src={item.thumbnail} alt=""/>
                                </div>
                                <div className="adatokMagassag">
                                    <div className="w-full mt-3 font-bold">{item.title}</div>
                                    <div className="flex justify-between mt-3">
                                        <div className="w-1/2">
                                            <div className="flex flex-col justify-center">
                                                {item.akcios ? (
                                                    <p className="bg-gray-400 text-white inline p-1 maxSzoveg border border-white">Akciós</p>
                                                ) : null}
                                                {item.ujdonsag ? (
                                                    <p className="bg-green-400 text-white inline p-1 maxSzoveg border border-white">Újdonság</p>
                                                ) : null}
                                                {item.kiarusitas ? (
                                                    <p className="bg-yellow-400 text-white inline p-1 maxSzoveg border border-white">Kiárusítás</p>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="w-1/2">
                                            <div className="text-xl">
                                                Ára: {item.price}$
                                            </div>
                                            <div className="text-xl">
                                                <span className="text-blue-500 font-bold">Raktáron:</span> {item.stock}DB
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="descriptionMagassag">
                                    {item.description}
                                </div>


                                <div className="flex justify-end border">
                                    <button
                                        className="relative bottom-0 bg-orange-400 hover:bg-green-500 text-white p-1"
                                        onClick={() => {
                                            handleClick(item);
                                            handleToBasketClick();
                                        }}
                                    >
                                        Kosárba
                                    </button>
                                </div>
                                {isKosarbaKattintva && (
                                    <div className="fixed inset-0 flex items-center justify-center">
                                        <div className="relative kosarDimensions">
                                            <div className="w-full flex justify-content-end">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" className="bi bi-x-lg cursor-pointer m-1"
                                                     viewBox="0 0 16 16"
                                                     onClick={toggleKosarbaAblak}>
                                                    <path
                                                        d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                                                </svg>
                                            </div>
                                            Kosárba téve {basketLength}db
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Welcome>
    );
}
