import {Head} from '@inertiajs/react';
import Welcome from "@/Pages/Welcome.jsx";
import axios from "axios";

export default function Product({auth, product}) {
    const handleClick = (product) => {

        const requestData = {
            user_id: auth.user ? auth.user.id : 'guest',
            product_id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
            discount_percentage: product.discountPercentage,
            rating: product.rating,
            stock: product.stock,
            brand: product.brand,
            category: product.category,
            thumbnail: product.thumbnail,
            images: product.images,
            akcios: product.akcios,
            ujdonsag: product.ujdonsag,
            kiarusitas: product.kiarusitas,

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
        window.location.reload();
    };
    return (
        <Welcome auth={auth} ch2={<h3>Köszönjük a látogatást!</h3>} ch3={<h3>Viszontlátásra!</h3>}>
            <div className="w-full md:w-4/5 lg:w-5/6 my-8 mx-auto">
                <div className="ml-8">
                    <div><h2 className="text-gray-500">{product.title}</h2></div>
                    <div>
                        {product.akcios !== 0 && (
                            <p className="bg-gray-400 text-white inline p-1 maxSzoveg border border-white">Akciós</p>
                        )}
                        {product.ujdonsag !== 0 && (
                            <p className="bg-green-400 text-white inline p-1 maxSzoveg border border-white">Újdonság</p>
                        )}
                        {product.kiarusitas !== 0 && (
                            <p className="bg-yellow-400 text-white inline p-1 maxSzoveg border border-white">Kiárusítás</p>
                        )}
                    </div>
                </div>
                <div className="ml-8 mt-3 flex">
                    <div className="w-1/2  max-h-120">
                        <img className="h-full w-auto object-cover" src={product.thumbnail} alt="Product" />
                    </div>
                    <div className="w-1/2 ml-8">
                        <h1>{product.price}$</h1>
                        <h3 className="text-gray-500">Raktáron <span className="text-black">(</span><span className="text-red-700">{product.stock}</span><span className="text-black">db)</span></h3>
                        <div className="flex mt-8">
                            <input
                                type="number"
                                className="h-10 border border-gray-300 p-2 rounded-none"
                                min="1"
                                defaultValue="1"
                                max={product.stock}
                            />
                            <button className="flex border h-10 items-center bg-orange-400 p-2 ml-1 text-white"
                                    onClick={() => handleClick(product)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-chevron-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                </svg>Hozzáadás a kosárhoz</button>
                        </div>
                    </div>
                </div>
            </div>
            <Head title="Product" />
            {auth.user ? (
            <h1>It is Super {auth.user.name}//--//{auth.user.email}!</h1>
                ) : (
                <h1>It is Super Guest!</h1>
                )}
            <h1>It is product {product.title}!</h1>
            <h1>It is product {product.description}!</h1>
        </Welcome>
    );
}
